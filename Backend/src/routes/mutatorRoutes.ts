import { MutatorController } from "controller/mutator.controller";
import { Router } from "express";

const router = Router();

router.get("/", MutatorController.getAvailable);
router.post("/update", MutatorController.update);

export default router;
