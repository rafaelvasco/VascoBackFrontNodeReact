import { FoodProduct } from "model";
import { Order } from "model/order.model";
import req from "supertest";

import App from "../app";

describe("Hello World Test", () => {
    it("Hello World Request", async () => {
        const result = await req(App).get("/");
        expect(result.text).toEqual('"Hamburgueria API: Hello World!"');
        expect(result.statusCode).toEqual(200);
    });
});

// =========================================================================

// Ingredientes	Valor
// Alface	R$ 0,40
// Bacon	R$ 2,00
// Hambúrguer de carne	R$ 3,00
// Ovo	R$ 0,80
// Queijo	R$ 1,50

// Lanche	Ingredientes
// X-Bacon	Bacon, hambúrguer de carne e queijo
// X-Burger	Hambúrguer de carne e queijo
// X-Egg	Ovo, hambúrguer de carne e queijo
// X-Egg Bacon	Ovo, bacon, hambúrguer de carne e queijo

// Obs: Valores em centavos

describe("Valor Lanches Menu sem Modificadores", () => {
    it("Valor X-Bacon", async () => {
        const result = await req(App).get("/api/products/?id=1");
        const product = result.body as FoodProduct;

        // 200 + 300 + 150 = 650
        expect(product.value.amount).toEqual(650);
    });

    it("Valor X-Burguer", async () => {
        const result = await req(App).get("/api/products/?id=2");
        const product = result.body as FoodProduct;

        // 300 + 150 = 450
        expect(product.value.amount).toEqual(450);
    });

    it("Valor X-Egg", async () => {
        const result = await req(App).get("/api/products/?id=3");
        const product = result.body as FoodProduct;

        // 80 + 300 + 150 = 530
        expect(product.value.amount).toEqual(530);
    });

    it("Valor X-Egg Bacon", async () => {
        const result = await req(App).get("/api/products/?id=4");
        const product = result.body as FoodProduct;

        // 80 + 200 + 300 + 150 = 730
        expect(product.value.amount).toEqual(730);
    });
});

// =========================================================================

describe("Valor Final de Lanches com Modificador Light Ativado", () => {
    it("Add Light Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "light", active: true });
        expect(result.status).toEqual(200);
    });

    it("Valor X-Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "1",
        });
        const order = result.body as Order;

        // 200 + 300 + 150 = 650
        expect(order.totalValue.amount).toEqual(650);
    });

    it("Valor X-Burguer", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "2",
        });
        const order = result.body as Order;

        // 300 + 150 = 450
        expect(order.totalValue.amount).toEqual(450);
    });

    it("Valor X-Egg", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "3",
        });
        const order = result.body as Order;

        // 80 + 300 + 150 = 530
        expect(order.totalValue.amount).toEqual(530);
    });

    it("Valor X-Egg Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "4",
        });
        const order = result.body as Order;

        // 80 + 200 + 300 + 150 = 730
        expect(order.totalValue.amount).toEqual(730);
    });

    it("Valor Lanche Custom Light", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, Ovo e Queijo
                customIngredients: {
                    "1": 1,
                    "4": 1,
                    "5": 1,
                },
            });
        const order = result.body as Order;

        // 40 + 80 + 150 (-10%) = 243
        expect(order.totalValue.amount).toEqual(243);
    });

    it("Remove Light Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "light", active: false });
        expect(result.status).toEqual(200);
    });
});

// =========================================================================

describe("Valor Final de Lanches com Modificador Heavy Meat Ativado", () => {
    it("Add Meat Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "heavyMeat", active: true });
        expect(result.status).toEqual(200);
    });

    it("Valor X-Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "1",
        });
        const order = result.body as Order;

        // 200 + 300 + 150 = 650
        expect(order.totalValue.amount).toEqual(650);
    });

    it("Valor X-Burguer", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "2",
        });
        const order = result.body as Order;

        // 300 + 150 = 450
        expect(order.totalValue.amount).toEqual(450);
    });

    it("Valor X-Egg", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "3",
        });
        const order = result.body as Order;

        // 80 + 300 + 150 = 530
        expect(order.totalValue.amount).toEqual(530);
    });

    it("Valor X-Egg Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "4",
        });
        const order = result.body as Order;

        // 80 + 200 + 300 + 150 = 730
        expect(order.totalValue.amount).toEqual(730);
    });

    it("Valor Lanche Custom 3x Carne", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 3x Hamburguer, Queijo
                customIngredients: {
                    "1": 1,
                    "3": 3,
                    "5": 1,
                },
            });
        const order = result.body as Order;

        // 40 + 300 + 300 + 150 = 790
        expect(order.totalValue.amount).toEqual(790);
    });

    it("Valor Lanche Custom 5x Carne", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 5x Hamburguer, Queijo
                customIngredients: {
                    "1": 1,
                    "3": 5,
                    "5": 1,
                },
            });

        const order = result.body as Order;

        // 40 + 300 + 300 + 300 + 300 + 300 + 150 = 1690
        expect(order.totalValue.amount).toEqual(1690);
    });

    it("Valor Lanche Custom 6x Carne", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 6x Hamburguer, Queijo
                customIngredients: {
                    "1": 1,
                    "3": 6,
                    "5": 1,
                },
            });
        const order = result.body as Order;

        // 40 + 300 + 300 + 300 + 300 + 150 = 1390
        expect(order.totalValue.amount).toEqual(1390);
    });

    it("Remove Heavy Meat Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "heavyMeat", active: false });
        expect(result.status).toEqual(200);
    });
});

// =========================================================================

describe("Valor Final Todas Combinações de Lanches com Modificador Heavy Cheese", () => {
    it("Add Cheese Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "heavyCheese", active: true });
        expect(result.status).toEqual(200);
    });

    it("Valor X-Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "1",
        });
        const order = result.body as Order;

        // 200 + 300 + 150 = 650
        expect(order.totalValue.amount).toEqual(650);
    });

    it("Valor X-Burguer", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "2",
        });
        const order = result.body as Order;

        // 300 + 150 = 450
        expect(order.totalValue.amount).toEqual(450);
    });

    it("Valor X-Egg", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "3",
        });
        const order = result.body as Order;

        // 80 + 300 + 150 = 530
        expect(order.totalValue.amount).toEqual(530);
    });

    it("Valor X-Egg Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "4",
        });
        const order = result.body as Order;

        // 80 + 200 + 300 + 150 = 730
        expect(order.totalValue.amount).toEqual(730);
    });

    it("Valor Lanche Custom 3x Queijo", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 3x Hamburguer, 3x Queijo
                customIngredients: {
                    "1": 1,
                    "3": 3,
                    "5": 3,
                },
            });
        const order = result.body as Order;

        // 40 + 300 + 300 + 300 + 150 + 150 = 1240
        expect(order.totalValue.amount).toEqual(1240);
    });

    it("Valor Lanche Custom 5x Queijo", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 3x Hamburguer, 5x Queijo
                customIngredients: {
                    "1": 1,
                    "3": 3,
                    "5": 5,
                },
            });
        const order = result.body as Order;

        // 40 + 300 + 300 + 300 + 150 + 150 + 150 + 150 + 150 = 1690
        expect(order.totalValue.amount).toEqual(1690);
    });

    it("Valor Lanche Custom 6x Queijo", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 3x Hamburguer, 6x Queijo
                customIngredients: {
                    "1": 1,
                    "3": 3,
                    "5": 6,
                },
            });
        const order = result.body as Order;

        // 40 + 300 + 300 + 300 + 150 + 150 + 150 + 150 = 1540
        expect(order.totalValue.amount).toEqual(1540);
    });

    it("Remove Heavy Cheese Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "heavyCheese", active: false });
        expect(result.status).toEqual(200);
    });
});

// =========================================================================

describe("Valor Final Todas Combinações de Lanches com Modificador Inflacao -10%", () => {
    it("Add Percentage Mutator", async () => {
        const result = await req(App)
            .post("/api/mutators/update")
            .send({ id: "percentage", active: true });
        expect(result.status).toEqual(200);
    });

    it("Valor X-Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "1",
        });
        const order = result.body as Order;

        expect(order.totalValue.amount).toEqual(585);
    });

    it("Valor X-Burguer", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "2",
        });
        const order = result.body as Order;

        expect(order.totalValue.amount).toEqual(405);
    });

    it("Valor X-Egg", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "3",
        });
        const order = result.body as Order;

        expect(order.totalValue.amount).toEqual(477);
    });

    it("Valor X-Egg Bacon", async () => {
        const result = await req(App).post("/api/order/total").send({
            menuId: "4",
        });
        const order = result.body as Order;

        expect(order.totalValue.amount).toEqual(657);
    });

    it("Valor Lanche Custom 6x Queijo", async () => {
        const result = await req(App)
            .post("/api/order/total")
            .send({
                // Alface, 3x Hamburguer, 6x Queijo
                customIngredients: {
                    "1": 1,
                    "3": 3,
                    "5": 6,
                },
            });
        const order = result.body as Order;

        // 40 + 300 + 300 + 300 + 150 + 150 + 150 + 150 + 150 + 150 (-10%) = 1656
        expect(order.totalValue.amount).toEqual(1656);
    });
});
