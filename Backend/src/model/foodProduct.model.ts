import { Ingredient } from "./ingredient.model";
import { Money } from "./money";

export class FoodProduct {
    id!: string;
    name!: string;
    ingredients!: Array<Ingredient>;
    value: Money;

    constructor(id: string, name: string, ingredients: Array<Ingredient>) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
    }
}
