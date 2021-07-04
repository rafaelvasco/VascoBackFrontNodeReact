export type IngredientDBModel = {
    id: string;
    name: string;
    value: number;
};

export type IngredientTableDbModel = {
    [key: string]: IngredientDBModel;
};

export type FoodProductDbModel = {
    id: string;
    name: string;
    ingredients: Array<string>;
};

export type FoodProductTableDbModel = {
    [key: string]: FoodProductDbModel;
};

export const moneyVault = {
    total: 0,
};

export const mutatorsDb = {
    active: [] as Array<string>,
};

//"1", "3", "3", "3", "5", "5", "5"
export const ingredients = {
    "1": {
        id: "1",
        name: "Alface",
        value: 40,
    } as IngredientDBModel,

    "2": {
        id: "2",
        name: "Bacon",
        value: 200,
    } as IngredientDBModel,

    "3": {
        id: "3",
        name: "Hambúrguer de Carne",
        value: 300,
    } as IngredientDBModel,

    "4": {
        id: "4",
        name: "Ovo",
        value: 80,
    } as IngredientDBModel,

    "5": {
        id: "5",
        name: "Queijo",
        value: 150,
    } as IngredientDBModel,
} as IngredientTableDbModel;

export const foodProducts = {
    "1": {
        id: "1",
        name: "X-Bacon",
        ingredients: ["2", "3", "5"],
    } as FoodProductDbModel,

    "2": {
        id: "2",
        name: "X-Burguer",
        ingredients: ["3", "5"],
    } as FoodProductDbModel,

    "3": {
        id: "3",
        name: "X-Egg",
        ingredients: ["3", "4", "5"],
    } as FoodProductDbModel,

    "4": {
        id: "4",
        name: "X-Egg Bacon",
        ingredients: ["2", "3", "4", "5"],
    } as FoodProductDbModel,
} as FoodProductTableDbModel;
