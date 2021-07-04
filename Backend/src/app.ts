import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "routes";
import { FoodProductsRepository } from "repository";
import { FoodProductService } from "service/foodProduct.service";
import Dinero from "dinero.js";
import { IngredientsRepository } from "repository/ingredients.repository";
import { IngredientService } from "service/ingredient.service";
import { OrderService } from "service/order.service";
import { MoneyVaultRepository } from "repository/moneyVault.repository";
import { MutatorsRepository } from "repository/mutators.repository";

require("dotenv").config();

export const DI = {} as {
    foodProductsRepository: FoodProductsRepository;
    foodProductsService: FoodProductService;
    ingredientsRepository: IngredientsRepository;
    ingredientsService: IngredientService;
    orderService: OrderService;
    moneyVaultRepository: MoneyVaultRepository;
    mutatorsRepository: MutatorsRepository;
};

class App {
    public express: express.Application;

    constructor() {
        console.log("Initializing Hamburgueria App");
        this.express = express();
        this.initializeComponents();
        this.configureMiddleWare();
        this.configureRoutes();
    }

    private async initializeComponents() {
        DI.foodProductsRepository = new FoodProductsRepository();
        DI.foodProductsService = new FoodProductService();
        DI.ingredientsRepository = new IngredientsRepository();
        DI.ingredientsService = new IngredientService();
        DI.orderService = new OrderService();
        DI.moneyVaultRepository = new MoneyVaultRepository();
        DI.mutatorsRepository = new MutatorsRepository();
    }

    private configureMiddleWare() {
        const ORIGIN = process.env.ORIGIN || "localhost:3000";

        this.express.use(
            cors({
                credentials: true,
                origin: ORIGIN,
            })
        );
        this.express.use(helmet());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));

        Dinero.globalLocale = process.env.LOCALE as string;
    }

    private configureRoutes() {
        this.express.get("/", (_, res) => {
            res.status(200).json("Hamburgueria API: Hello World!");
        });

        this.express.use("/", routes);

        this.express.use("*", (_, res) => {
            res.status(404).json({
                message: "Invalid Url Request",
            });
        });
    }
}

export default new App().express;
