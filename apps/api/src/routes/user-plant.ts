import { Router } from "express";
import {
	createUserPlantController,
	readUserPlantController,
	readUserPlantsController,
} from "../controllers/user-plant.js";
import { validateUserPlantInput } from "../middlewares/user-plant.js";

const router: Router = Router({ mergeParams: true });

// fetch user plants
router.post("/", validateUserPlantInput, createUserPlantController);
router.get("/", readUserPlantsController);
router.get("/:plantId", readUserPlantController);

export default router;
