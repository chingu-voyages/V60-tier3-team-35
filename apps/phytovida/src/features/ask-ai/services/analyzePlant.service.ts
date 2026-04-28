import buildFormData from "../utils/buildFormData";
import parseResponse from "../utils/parseResponse";
import validateFile from "../utils/validateFile";
import type { DiagnosisResult, PlantNetResponse } from "./analyzePlant.types";

const API_KEY = import.meta.env.VITE_PLANTNET_API_KEY;
const BASE_URL = "https://my-api.plantnet.org/v2/diseases/identify";
export async function analyzePlant(file: File): Promise<DiagnosisResult> {
  if (!API_KEY) {
    throw new Error("Missing VITE_PLANTNET_API_KEY in .env");
  }

  validateFile(file);

  const formData = buildFormData(file);
  const url = `${BASE_URL}?api-key=${API_KEY}&lang=en&include-related-images=false`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  // No plant detected
  if (res.status === 404) {
    throw new Error("No plant detected. Please try a clearer photo.");
  }

  // Rate limit hit
  if (res.status === 429) {
    throw new Error("Daily request limit reached. Please try again tomorrow.");
  }

  if (!res.ok) {
    throw new Error(`PlantNet API error: ${res.status}`);
  }

  const data: PlantNetResponse = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Could not identify the plant. Please try another photo.");
  }

  return parseResponse(data);
}
