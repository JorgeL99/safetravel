const matchesCondition = (actual, accepted) => accepted.includes(actual);

export function buildFacts(answers) {
  return answers.reduce((facts, answer) => ({ ...facts, ...(answer?.facts ?? {}) }), {});
}

export function inferDestination(facts, rules, destinations) {
  const evidence = Object.fromEntries(destinations.map(({ id }) => [id, []]));
  const ruleEvaluations = [];

  rules.forEach((rule) => {
    const entries = Object.entries(rule.conditions);
    const matched = entries.filter(([key, accepted]) => matchesCondition(facts[key], accepted));
    const coverage = matched.length / entries.length;
    const certainty = rule.weight * coverage;
    ruleEvaluations.push({
      ...rule,
      matchedConditions: matched.map(([key]) => key),
      missingConditions: entries.filter(([key]) => !matched.some(([matchedKey]) => matchedKey === key)).map(([key]) => key),
      coverage,
      certainty,
      status: coverage === 1 ? "complete" : coverage > 0 ? "partial" : "discarded",
    });
    if (!matched.length) return;
    evidence[rule.destination].push({
      ruleId: rule.id,
      certainty,
      coverage,
      explanation: rule.explanation,
    });
  });

  const ranking = destinations.map((destination) => {
    const activations = evidence[destination.id].sort((a, b) => b.certainty - a.certainty);
    const combined = activations.reduce((certainty, activation) => (
      certainty + activation.certainty * (1 - certainty)
    ), 0);
    return { destination, certainty: Math.round(combined * 100), activations };
  }).sort((a, b) => b.certainty - a.certainty || a.destination.name.localeCompare(b.destination.name));

  return {
    recommendation: ranking[0],
    alternatives: ranking.slice(1, 3),
    ranking,
    facts,
    ruleEvaluations,
  };
}
