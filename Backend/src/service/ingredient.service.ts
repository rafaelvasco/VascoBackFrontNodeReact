import { DI } from "app";
import { getMonetaryCurrency } from "config/currency";
import Dinero from "dinero.js";
import { Money } from "model/money";

export class IngredientService {
    public getAllAvailable() {
        return DI.ingredientsRepository.getAll();
    }

    public calculateTotalValue(ingredientIds: Array<string>): Money {
        let totalValue = Dinero({
            amount: 0,
            currency: getMonetaryCurrency(),
        });

        ingredientIds.forEach((ingredientId) => {
            const ingredient = DI.ingredientsRepository.getById(ingredientId);

            let ingredientMoneyValue = Dinero({
                amount: ingredient.value.amount,
                currency: getMonetaryCurrency(),
            });

            totalValue = totalValue.add(ingredientMoneyValue);
        });

        return new Money(totalValue.getAmount());
    }
}
