import { Ingredient } from "model";
import { ingredients } from "./db";

export class IngredientsRepository {
    public getById(id: string): Ingredient {
        const ingredient = ingredients[id];

        if (!ingredient) {
            throw `Invalid ingredient Id: ${id}`;
        }

        return new Ingredient(ingredient.id, ingredient.name, ingredient.value);
    }

    public getAll(): Array<Ingredient> {
        const result: Array<Ingredient> = [];

        Object.keys(ingredients).forEach((ingredientId) => {
            const ingredient = ingredients[ingredientId];
            const ingredientModel = new Ingredient(
                ingredientId,
                ingredient.name,
                ingredient.value
            );

            result.push(ingredientModel);
        });

        return result;
    }
}
