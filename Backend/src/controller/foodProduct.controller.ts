import { DI } from "app";
import { Request, Response } from "express";

export class FoodProductController {
    static getMenu = async (req: Request, res: Response) => {
        console.info("ItemController::getMenu");

        try {
            const result = DI.foodProductsService.getMenu();
            res.json(result);
        } catch (e) {
            res.status(500).json({ message: e });
        }
    };

    static get = async (req: Request, res: Response) => {
        console.info("ItemController::get");

        const id = req.query.id as string;

        if (!id) {
            return res
                .status(400)
                .json({ message: "Bad Requested, Expected Product Id" });
        }

        try {
            const result = DI.foodProductsService.get(id);
            return res.json(result);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    };
}
