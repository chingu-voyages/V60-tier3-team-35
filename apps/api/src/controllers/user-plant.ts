import type { Request, Response } from "express";
import { plants, usersPlants } from "../db/schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

export const readUserPlantsController = async (req: Request, res: Response) => {
	try {
		const userId = req.userId!;

		// pagination
		const page = Number(req.query.page ?? 1);
		const limit = Number(req.query.limit ?? 10);
		const offset = (page - 1) * limit;

		// total count (for pagination meta)
		const totalResult = await db
			.select({ count: usersPlants.id })
			.from(usersPlants);
		// .where(eq(usersPlants.userId, userId)); // TODO: uncomment later

		const total = totalResult.length;

		// main query with join
		const data = await db
			.select({
				id: usersPlants.id,
				plantId: usersPlants.plantId,
				wateringFrequency: usersPlants.wateringFrequency,
				lastWateredDate: usersPlants.lastWateredDate,
				plantName: plants.name,
				plantImg: plants.imageUrl,
				minTemp: plants.minTemp,
				maxTemp: plants.maxTemp,
			})
			.from(usersPlants)
			.leftJoin(plants, eq(usersPlants.plantId, plants.id))
			// .where(eq(usersPlants.userId, userId)) // TODO: uncomment later
			.limit(limit)
			.offset(offset);

		return res.status(200).json({
			data,
			pagination: {
				page,
				limit,
				total,
				hasNextPage: offset + limit < total,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: true,
			message: "Failed to fetch your plants",
		});
	}
};
