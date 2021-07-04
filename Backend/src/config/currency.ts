import { Currency } from "dinero.js";

export const getMonetaryCurrency = (): Currency => {
    return (process.env.CURRENCY as Currency) || "BRL";
};
