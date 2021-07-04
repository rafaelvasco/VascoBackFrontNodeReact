import { FoodProductController } from "controller";
import { Router } from "express";

const router = Router();

router.get("/menu", FoodProductController.getMenu);
router.get("/", FoodProductController.get);

export default router;
