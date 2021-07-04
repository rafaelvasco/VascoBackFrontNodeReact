import { OrderController } from "controller/order.controller";
import { Router } from "express";

const router = Router();

router.post("/total", OrderController.totalValue);
router.post("/", OrderController.execute);

export default router;
