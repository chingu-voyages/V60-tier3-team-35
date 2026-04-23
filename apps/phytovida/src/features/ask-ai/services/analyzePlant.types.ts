export interface PlantNetResult {
  name: string;
  score: number;
  description: string;
}

export interface PlantNetResponse {
  results: PlantNetResult[];
  remainingIdentificationRequests: number;
  version: string;
}
export interface DiagnosisResult {
  topMatch: string | null;
  description: string | null;
  confidence: number | null;
  remainingRequests: number;
  allMatches: Array<{
    name: string;
    description: string;
    confidence: number;
  }>;
}
