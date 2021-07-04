import { getMonetaryCurrency } from "config/currency";
import Dinero from "dinero.js";

export const getFormattedValue = (value: number) => {
    let dinero = Dinero({
        amount: value,
        currency: getMonetaryCurrency(),
    });

    return dinero.toFormat("$0,0.00");
};

export const discountPercentage = (value: number, discount: number): number => {
    let dinero = Dinero({
        amount: value,
        currency: getMonetaryCurrency(),
    });

    return dinero.subtract(dinero.multiply(discount / 100)).getAmount();
};

export const discountValueAmount = (
    value: number,
    discount: number
): number => {
    console.log(`Discount ${discount} from ${value}`);

    let dinero = Dinero({
        amount: value,
        currency: getMonetaryCurrency(),
    });

    let discountDinero = Dinero({
        amount: discount,
        currency: getMonetaryCurrency(),
    });

    return dinero.subtract(discountDinero).getAmount();
};
