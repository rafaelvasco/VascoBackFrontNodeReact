import { Request, Response } from "express";

import { DI } from "app";
import Joi from "joi";
import { validateRequest } from "middleware/schemaValidate";
import { Mutator } from "dto/Mutator";

export class MutatorController {
    static getAvailable = async (req: Request, res: Response) => {
        console.info("MutatorController::getAvailable");

        try {
            const result = DI.mutatorsRepository.getAvailable();
            return res.json(result);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    };

    static update = async (req: Request, res: Response) => {
        console.info("MutatorController::update");

        const schema = Joi.object({
            id: Joi.string().required(),
            active: Joi.boolean().required(),
        });

        const processRequestResult = validateRequest(req.body, schema);

        if (!processRequestResult.ok) {
            return res
                .status(400)
                .json({ message: processRequestResult.error });
        }

        const mutator = processRequestResult.value as Mutator;

        try {
            DI.mutatorsRepository.updateMutator(mutator);

            return res.status(200).send();
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    };
}
