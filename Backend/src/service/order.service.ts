import { DI } from "app";
import { Order } from "model/order.model";
import { OrderMap } from "model/orderMap";

export class OrderService {
    public executeOrder(order: Order) {
        this.processOrderTotalValue(order);
        DI.moneyVaultRepository.add(order.totalValue.amount);
    }

    private buildIngredientListFromOrderMap = (
        orderMap: OrderMap
    ): Array<string> => {
        let result = new Array<string>();

        Object.keys(orderMap).forEach((ingredientId) => {
            const qty: number = orderMap[ingredientId];

            for (let i = 0; i < qty; i++) {
                result.push(ingredientId);
            }
        });

        return result;
    };

    public processOrderTotalValue(order: Order) {
        const mutators = DI.mutatorsRepository.getActive();
        if (order.menuId) {
            const product = DI.foodProductsService.get(order.menuId);
            if (product) {
                order.totalValue = product.value;

                mutators.forEach((mutator) => {
                    mutator.mutateOrderValue(order, product.ingredients);
                });
            } else {
                throw `Invalid Order: Menu Product Id Invalid: ${order.menuId}`;
            }
        } else {
            const ingredientIdList = this.buildIngredientListFromOrderMap(
                order.customIngredients
            );

            order.totalValue =
                DI.ingredientsService.calculateTotalValue(ingredientIdList);

            mutators.forEach((mutator) => {
                mutator.mutateOrderValue(
                    order,
                    ingredientIdList.map((ingrId) =>
                        DI.ingredientsRepository.getById(ingrId)
                    )
                );
            });
        }
    }
}
