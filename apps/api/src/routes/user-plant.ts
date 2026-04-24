import { Router } from "express";
import {
  readUserPlantController,
  readUserPlantsController,
} from "../controllers/user-plant.js";
import { readAllUserLogsController } from "../controllers/plant-logs.js";

const router: Router = Router({ mergeParams: true });

router.get("/", readUserPlantsController);

router.get("/logs", readAllUserLogsController);

router.get("/:plantId", readUserPlantController);

export default router;
