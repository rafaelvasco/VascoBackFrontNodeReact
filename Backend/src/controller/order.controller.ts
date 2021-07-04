import { DI } from "app";
import { Request, Response } from "express";
import Joi from "joi";
import { Order } from "model/order.model";
import { validateRequest } from "middleware/schemaValidate";

export class OrderController {
    static totalValue = async (req: Request, res: Response) => {
        console.info("OrderController::totalValue");

        const schema = Joi.object({
            menuId: Joi.string(),
            customIngredients: Joi.object().pattern(/^[\d]+$/, Joi.number()),
            totalValue: Joi.number().required,
        }).or("menuId", "customIngredients");

        const processRequestResult = validateRequest(req.body, schema);

        if (!processRequestResult.ok) {
            return res
                .status(400)
                .json({ message: processRequestResult.error });
        }

        const order = processRequestResult.value as Order;

        try {
            DI.orderService.processOrderTotalValue(order);
            return res.json(order);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e });
        }
    };

    static execute = async (req: Request, res: Response) => {
        console.info("OrderController::execute");

        const schema = Joi.object({
            menuId: Joi.string(),
            customIngredients: Joi.array().items(Joi.string()),
            totalValue: Joi.number().required,
        }).or("menuId", "customIngredients");

        const processRequestResult = validateRequest(req.body, schema);

        if (!processRequestResult.ok) {
            return res
                .status(400)
                .json({ message: processRequestResult.error });
        }

        const order = processRequestResult.value as Order;

        try {
            DI.orderService.executeOrder(order);
            return res.json({ message: "Order Executed Successfully" });
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    };
}
