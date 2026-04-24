import type { Request, Response, NextFunction } from "express";

export const validateUserPlantInput = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: "Missing request body" });
    }
    console.log("In verification clerkMiddleware...")
    console.log(req.body, typeof req.body);
    const { plantId, phase, wateringFrequency, lastWateredDate } = data;
    if (!plantId || typeof plantId !== "string") {
        return res.status(400).json({ error: "Missing or invalid plantId" });
    }

    if (!phase || typeof phase !== "string" || !["planning", "growing"].includes(phase)) {
        return res.status(400).json({ error: "Missing or invalid phase" });
    }

    if (wateringFrequency && (typeof wateringFrequency !== "number" || wateringFrequency <= 0)) {
        return res.status(400).json({ error: "Invalid wateringFrequency" });
    }

    if (lastWateredDate && !(lastWateredDate instanceof Date) && isNaN(Date.parse(lastWateredDate))) {
        return res.status(400).json({ error: "Invalid lastWateredDate" });
    }

    next();
}