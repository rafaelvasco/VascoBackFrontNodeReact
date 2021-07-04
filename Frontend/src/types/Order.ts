import { Money } from "./Money";
import { OrderMap } from "./OrderMap";

export type Order = {
    menuId: string;
    customIngredients: OrderMap;
    totalValue: Money;
};
