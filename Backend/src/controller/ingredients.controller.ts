import { DI } from "app";
import { Request, Response } from "express";

export class IngredientsController {
    static getAllAvailable = async (req: Request, res: Response) => {
        console.info("IngredientsController::getAllAvailable");

        try {
            const result = DI.ingredientsService.getAllAvailable();
            res.json(result);
        } catch (e) {
            res.status(500).json({ message: e });
        }
    };
}
