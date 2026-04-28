import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { sql } from "drizzle-orm";
import { plants } from "../db/schema.js";
import type { PerenualPlant, PerenualResponse } from "@repo/types";

const PERENUAL_BASE_URL = "https://perenual.com/api";
const API_KEY = process.env.PERENUAL_API_KEY;

export const getPlantsData = async (req: Request, res: Response) => {

    try {

        const response = await fetch(
            `${PERENUAL_BASE_URL}/species-list?key=${API_KEY}&page=1`
        );

        if (!response.ok) {
            throw new Error(`Perenual API error: ${response.status}`);
        }

        let data: PerenualResponse;
        try {
            data = await response.json() as PerenualResponse;
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            throw parseError;

        }

        const plantRows = data.data.map((plant: PerenualPlant) => ({
            id: String(plant.id),
            name: plant.common_name,
            imageUrl: plant.default_image?.medium_url ?? null,
            minTemp: plant.hardiness?.min ? parseInt(plant.hardiness.min) : null,
            maxTemp: plant.hardiness?.max ? parseInt(plant.hardiness.max) : null,
        }));


        await db
            .insert(plants)
            .values(plantRows)
            .onConflictDoUpdate({
                target: plants.id,
                set: {
                    name: sql`excluded.name`,
                    imageUrl: sql`excluded.image_url`,
                    minTemp: sql`excluded.min_temp`,
                    maxTemp: sql`excluded.max_temp`,
                },
            });

        res.status(200).json({ inserted: plantRows.length });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch plants from db" });
    }

};

// plantlibrary.ts controller
export const getPlants = async (req: Request, res: Response) => {

    try {
        // parse page and limit from req query
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        // compute offset
        const offset = (page - 1) * limit;

        // total count 
        const totalResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(plants);

        if (!totalResult[0]) {
            throw new Error("Count query returned no rows");
        }
        const total = Number(totalResult[0].count);

        const allPlants = await db.select().from(plants).limit(limit).offset(offset);

        const hasNextPage = offset + limit < total;

        res.status(200).json({
            data: allPlants,
            pagination: { total, hasNextPage }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch plants" });
    }
};


