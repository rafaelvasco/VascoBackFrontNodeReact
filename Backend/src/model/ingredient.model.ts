import { Money } from "./money";

export class Ingredient {
    id!: string;
    name!: string;
    value!: Money;

    constructor(id: string, name: string, value: number) {
        this.id = id;
        this.name = name;
        this.value = new Money(value);
    }
}
