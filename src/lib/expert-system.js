const matchesCondition = (actual, accepted) => accepted.includes(actual);

export const EXPERT_THRESHOLDS = { minimumCertainty: 60, minimumGap: 4, requiredFacts: 7 };

export function assessInferenceConfidence(ranking, facts, thresholds = EXPERT_THRESHOLDS) {
  const top = ranking[0]?.certainty ?? 0;
  const second = ranking[1]?.certainty ?? 0;
  const gap = top - second;
  const factCount = Object.keys(facts ?? {}).length;
  const reasons = [];
  if (factCount < thresholds.requiredFacts) reasons.push(`Faltan ${thresholds.requiredFacts - factCount} preferencias por registrar.`);
  if (top < thresholds.minimumCertainty) reasons.push(`La mejor coincidencia no alcanza el ${thresholds.minimumCertainty}% mínimo.`);
  if (ranking.length > 1 && gap < thresholds.minimumGap) reasons.push(`Solo existen ${gap} puntos de diferencia frente a la segunda opción.`);
  const status = reasons.length ? 'insufficient' : top >= 85 && gap >= 10 ? 'high' : 'moderate';
  return { status, isSufficient: status !== 'insufficient', gap, factCount, reasons, thresholds };
}

export function validateKnowledgeBase(rules, destinations, factIds) {
  const destinationIds = new Set(destinations.map(({ id }) => id));
  const validFacts = new Set(factIds);
  const duplicateRuleIds = rules.filter((rule, index) => rules.findIndex(({ id }) => id === rule.id) !== index).map(({ id }) => id);
  const orphanRules = rules.filter(({ destination }) => !destinationIds.has(destination)).map(({ id }) => id);
  const invalidRules = rules.filter(({ conditions, explanation, weight }) => !Object.keys(conditions).length || Object.keys(conditions).some((key) => !validFacts.has(key)) || weight <= 0 || weight > 1 || !explanation.trim()).map(({ id }) => id);
  const rows = destinations.map((destination) => {
    const destinationRules = rules.filter(({ destination: id }) => id === destination.id);
    const coveredFacts = [...new Set(destinationRules.flatMap(({ conditions }) => Object.keys(conditions)))];
    const issues = [];
    if (destinationRules.length < 2) issues.push('Requiere al menos dos reglas');
    if (destinationRules.some(({ id }) => invalidRules.includes(id))) issues.push('Contiene una regla inválida');
    return { destination, ruleCount: destinationRules.length, coveredFacts, issues, status: issues.length ? 'review' : 'valid' };
  });
  return { rows, duplicateRuleIds, orphanRules, invalidRules, isValid: !duplicateRuleIds.length && !orphanRules.length && !invalidRules.length && rows.every(({ status }) => status === 'valid') };
}

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

  const assessment = assessInferenceConfidence(ranking, facts);
  return {
    recommendation: ranking[0],
    alternatives: ranking.slice(1, 3),
    ranking,
    facts,
    ruleEvaluations,
    assessment,
  };
}
