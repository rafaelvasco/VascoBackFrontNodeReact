import { Ingredient } from "./Ingredient";
import { Money } from "./Money";

export type FoodProduct = {
    id: string;
    name: string;
    ingredients: Array<Ingredient>;
    value: Money;
}