import { Router } from "express";
import { readUserPlantsController } from "../controllers/user-plant.js";

const router: Router = Router({ mergeParams: true });

// fetch user plants
router.get("/", readUserPlantsController);

export default router;
