import { MoneyVaultController } from "controller/moneyVaultController";
import { Router } from "express";

const router = Router();

router.get("/total", MoneyVaultController.getTotal);

export default router;
