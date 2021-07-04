import { DI } from "app";
import { FoodProduct } from "model";
import { foodProducts } from "./db";

export class FoodProductsRepository {
    getById(id: string): FoodProduct | null {
        const product = foodProducts[id];

        if (!product) {
            return null;
        }

        const result = new FoodProduct(
            product.id,
            product.name,
            product.ingredients.map((ingredientId) =>
                DI.ingredientsRepository.getById(ingredientId)
            )
        );

        return result;
    }

    getAll(): Array<FoodProduct> {
        const result: Array<FoodProduct> = [];

        Object.keys(foodProducts).forEach((foodProductId) => {
            const foodProduct = foodProducts[foodProductId];
            const foodProductModel = new FoodProduct(
                foodProductId,
                foodProduct.name,
                foodProduct.ingredients.map((ingredientId) =>
                    DI.ingredientsRepository.getById(ingredientId)
                )
            );

            result.push(foodProductModel);
        });

        return result;
    }
}
