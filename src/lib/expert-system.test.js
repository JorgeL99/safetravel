import { describe, expect, it } from "vitest";
import { expertDestinations, expertQuestions, expertRules } from "../data/expert-knowledge";
import { assessInferenceConfidence, buildFacts, inferDestination, validateKnowledgeBase } from "./expert-system";

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

  it("declara evidencia insuficiente cuando dos hipótesis están demasiado próximas", () => {
    const assessment = assessInferenceConfidence([{ certainty: 80 }, { certainty: 78 }], {
      region: 'costa', interest: 'historia', climate: 'seco', activity: 'media', altitude: 'baja', duration: 'corta', budget: 'moderado',
    });
    expect(assessment).toMatchObject({ status: 'insufficient', isSufficient: false, gap: 2 });
    expect(assessment.reasons[0]).toContain('diferencia');
  });

  it("valida referencias y cobertura estructural de la base de conocimiento", () => {
    const validation = validateKnowledgeBase(expertRules, expertDestinations, expertQuestions.map(({ id }) => id));
    expect(validation.isValid).toBe(true);
    expect(validation.rows.every(({ ruleCount }) => ruleCount === 2)).toBe(true);
    expect(validation.orphanRules).toEqual([]);
  });
});
