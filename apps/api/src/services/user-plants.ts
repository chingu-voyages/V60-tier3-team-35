import { eq } from "drizzle-orm";
import { UserPlantCreation } from "../../types/user-plant.js";
import { db } from "../db/index.js";
import { userSettings, usersPlants, plants } from "../db/schema.js";
import { errAsync, okAsync } from "neverthrow";

export const addUserPlant = async (userId: string, plant: UserPlantCreation) => {
    try {
        // Check if user exists in the database
        const user = await db
            .select()
            .from(userSettings)
            .where(eq(userSettings.userId, userId))
            .limit(1);

        if (user.length === 0) {
            return errAsync({ reason: "UserNotFound", message: "User not found in the database" });
        }

        // Check if plant exists in the database
        const plantFromDb = await db.select()
            .from(plants)
            .where(eq(plants.id, plant.plantId))
            .limit(1);

        if (plantFromDb.length === 0) {
            return errAsync({ reason: "PlantNotFound", message: "Plant not found in the database" });
        }

        // If it does, add it to the user's collection with the provided details
        return okAsync(await db.insert(usersPlants).values({
            userId,
            ...plant
        }));
    } catch (error) {
        return errAsync({ reason: "InternalServerError", message: `${error} An error occurred while adding the plant to the user's collection.` });
    }
}