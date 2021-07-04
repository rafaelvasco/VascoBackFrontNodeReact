import { Money } from "model/money";
import { moneyVault } from "./db";

export class MoneyVaultRepository {
    public add(value: number) {
        moneyVault.total += value;
    }

    public get(): Money {
        return new Money(moneyVault.total);
    }
}
