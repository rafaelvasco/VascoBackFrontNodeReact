import { IngredientsController } from "controller";
import { Router } from "express";

const router = Router();

router.get("/all", IngredientsController.getAllAvailable);

export default router;
