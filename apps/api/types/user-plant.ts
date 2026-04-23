export interface UserPlantCreation {
    plantId: string;
    phase: string;
    wateringFrequency: number | null;
    lastWateredDate: Date | null;
}