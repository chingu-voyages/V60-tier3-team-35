import { Router } from "express";
import { getPlantsData, getPlants } from "../controllers/plantlibrary.js";

const router: Router = Router();

router.get("/", getPlants);
router.post("/seed", getPlantsData)

export default router;
