import { describe, expect, it } from "vitest";
import { expertDestinations, expertQuestions, expertRules } from "../data/expert-knowledge";
import { buildFacts, inferDestination } from "./expert-system";

const answer = (questionId, factValue) => {
  const question = expertQuestions.find(({ id }) => id === questionId);
  return question.options.find(({ facts }) => Object.values(facts).includes(factValue));
};

describe("expert recommendation engine", () => {
  it("construye hechos a partir de las respuestas", () => {
    expect(buildFacts([answer("region", "selva"), answer("interest", "naturaleza")])).toEqual({ region: "selva", interest: "naturaleza" });
  });

  it("recomienda Tambopata para un perfil amazónico activo", () => {
    const facts = buildFacts([
      answer("region", "selva"), answer("interest", "naturaleza"), answer("climate", "tropical"),
      answer("activity", "alta"), answer("altitude", "baja"), answer("duration", "larga"), answer("budget", "flexible"),
    ]);
    const result = inferDestination(facts, expertRules, expertDestinations);
    expect(result.recommendation.destination.id).toBe("tambopata");
    expect(result.recommendation.certainty).toBeGreaterThan(80);
    expect(result.recommendation.activations[0].ruleId).toBeTruthy();
  });

  it("recomienda Áncash para montaña y actividad alta", () => {
    const facts = buildFacts([
      answer("region", "sierra"), answer("interest", "aventura"), answer("climate", "frio"),
      answer("activity", "alta"), answer("altitude", "alta"), answer("duration", "larga"), answer("budget", "moderado"),
    ]);
    expect(inferDestination(facts, expertRules, expertDestinations).recommendation.destination.id).toBe("ancash");
  });

  it("produce alternativas ordenadas y explicaciones trazables", () => {
    const result = inferDestination({ region: "costa", interest: "naturaleza", climate: "templado", activity: "baja", altitude: "baja", duration: "corta", budget: "economico" }, expertRules, expertDestinations);
    expect(result.recommendation.destination.id).toBe("paracas");
    expect(result.alternatives).toHaveLength(2);
    expect(result.recommendation.activations.every(({ explanation }) => explanation.length > 0)).toBe(true);
    expect(result.ruleEvaluations).toHaveLength(expertRules.length);
    expect(result.ruleEvaluations.some(({ status }) => status === "complete")).toBe(true);
    expect(result.ruleEvaluations.some(({ status }) => status === "discarded")).toBe(true);
  });
});
