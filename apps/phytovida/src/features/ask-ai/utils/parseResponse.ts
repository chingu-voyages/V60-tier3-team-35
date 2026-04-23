import type {
  DiagnosisResult,
  PlantNetResponse,
} from "../services/analyzePlant.types";

function parseResponse(data: PlantNetResponse): DiagnosisResult {
  const top = data.results[0];

  return {
    topMatch: top.name,
    description: top.description,
    confidence: Math.round(top.score * 100),
    remainingRequests: data.remainingIdentificationRequests,
    allMatches: data.results.slice(0, 5).map((r) => ({
      name: r.name,
      description: r.description,
      confidence: Math.round(r.score * 100),
    })),
  };
}

export default parseResponse;
