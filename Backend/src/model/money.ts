import { getFormattedValue } from "middleware/monetaryFunctions";

export class Money {
    public amount: number;
    public formattedAmount: string;

    public constructor(value: number) {
        this.amount = value;
        this.formattedAmount = getFormattedValue(value);
    }
}
