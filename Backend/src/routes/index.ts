import { Router } from "express";

import foodProductsRoutes from "./foodProductsRoutes";
import ingredientsRoutes from "./ingredientsRoutes";
import moneyVaultRoutes from "./moneyVaultRoutes";
import orderRoutes from "./orderRoutes";
import mutatorRoutes from "./mutatorRoutes";

const routes = Router();

routes.use("/api/products", foodProductsRoutes);
routes.use("/api/ingredients", ingredientsRoutes);
routes.use("/api/money", moneyVaultRoutes);
routes.use("/api/order", orderRoutes);
routes.use("/api/mutators", mutatorRoutes);

export default routes;
