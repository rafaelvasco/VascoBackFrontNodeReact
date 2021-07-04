import { FoodProduct } from "model";
import { DI } from "app";
import { Money } from "model/money";

export class FoodProductService {
    public getMenu(): Array<FoodProduct> {
        const result = DI.foodProductsRepository.getAll();

        result.forEach((foodProduct) => {
            foodProduct.value = this.calculateTotalValue(foodProduct);
        });

        return result;
    }

    public get(id: string): FoodProduct | null {
        const result = DI.foodProductsRepository.getById(id);

        if (result) {
            result.value = this.calculateTotalValue(result);
        }

        return result;
    }

    private calculateTotalValue(foodProduct: FoodProduct): Money {
        return DI.ingredientsService.calculateTotalValue(
            foodProduct.ingredients.map((ingr) => ingr.id)
        );
    }
}
