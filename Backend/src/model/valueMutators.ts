import {
    discountPercentage,
    discountValueAmount,
} from "middleware/monetaryFunctions";
import { Ingredient } from "./ingredient.model";
import { Money } from "./money";
import { Order } from "./order.model";

export abstract class ValueMutator {
    protected _name: string;

    public get name() {
        return this._name;
    }

    protected constructor(name: string) {
        this._name = name;
    }

    abstract mutateOrderValue(
        order: Order,
        ingredients: Array<Ingredient>
    ): void;
}

export type MutatorsMapType = {
    [mutatorId: string]: ValueMutator;
};

export class PercentageMutator extends ValueMutator {
    private percentage: number;

    constructor(percentage: number) {
        super("Inflação");
        this.percentage = percentage;
    }

    mutateOrderValue(order: Order, ingredients: Ingredient[]): void {
        order.totalValue = new Money(
            discountPercentage(order.totalValue.amount, this.percentage)
        );
    }
}

// Has Ingredient 1 (Alface) and doesn't have 2 (Bacon)
export class LightMutator extends ValueMutator {
    constructor() {
        super("Light");
    }

    mutateOrderValue(order: Order, ingredients: Array<Ingredient>): void {
        let baseValue = order.totalValue.amount;

        let hasDiscount = false;

        if (
            ingredients.findIndex((ingr) => ingr.id === "1") >= 0 &&
            ingredients.findIndex((ingr) => ingr.id === "2") < 0
        ) {
            hasDiscount = true;
        }

        if (hasDiscount) {
            order.totalValue = new Money(discountPercentage(baseValue, 10));
        }
    }
}

export class HeavyIngredientMutator extends ValueMutator {
    ingredientId: string;
    discountThreshold: number;

    constructor(name: string, ingredientId: string, discountThreshold: number) {
        super(name);
        this.ingredientId = ingredientId;
        this.discountThreshold = discountThreshold;
    }
    mutateOrderValue(order: Order, ingredients: Ingredient[]): void {
        let baseValue = order.totalValue.amount;

        let totalValueToDiscount = 0;

        let filteredIngredients = ingredients.filter(
            (ingr) => ingr.id === this.ingredientId
        );

        if (filteredIngredients.length >= this.discountThreshold) {
            if (filteredIngredients.length % this.discountThreshold === 0) {
                let qtyToDiscount =
                    filteredIngredients.length / this.discountThreshold;
                totalValueToDiscount =
                    filteredIngredients[0].value.amount * qtyToDiscount;
            }
        }

        console.log(`Total Value To Discount: ${totalValueToDiscount}`);

        if (totalValueToDiscount > 0) {
            order.totalValue = new Money(
                discountValueAmount(baseValue, totalValueToDiscount)
            );
        }
    }
}

export const mutators = {
    light: new LightMutator(),
    heavyMeat: new HeavyIngredientMutator("Muita Carne", "3", 3),
    heavyCheese: new HeavyIngredientMutator("Muito Queijo", "5", 3),
    percentage: new PercentageMutator(10),
} as MutatorsMapType;
