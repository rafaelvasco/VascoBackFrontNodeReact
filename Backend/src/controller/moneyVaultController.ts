import { DI } from "app";
import { Request, Response } from "express";

export class MoneyVaultController {
    static getTotal = async (req: Request, res: Response) => {
        try {
            const result = DI.moneyVaultRepository.get();
            return res.json(result);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    };
}
