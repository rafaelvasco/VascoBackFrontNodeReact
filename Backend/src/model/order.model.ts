import { Money } from "./money";
import { OrderMap } from "./orderMap";

export class Order {
    menuId: string;
    customIngredients: OrderMap;
    totalValue: Money;
}
