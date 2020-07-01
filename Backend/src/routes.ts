import express from "express";
import SalesController from "./controllers/SalesController";
import ProductsController from "./controllers/ProductsController";

const routes = express.Router();
const salesController = new SalesController();
const productsController = new ProductsController();

routes.get("/vendas", salesController.index);
routes.get("/vendas/:id", salesController.show);
routes.post("/vendas", salesController.create);

routes.get("/produtos", productsController.index);
routes.get("/produtos/:id", productsController.show);
routes.post("/produtos", productsController.create);
routes.put("/produtos/:id", productsController.change);
routes.delete("/produtos/", productsController.delete);
routes.delete("/produtos/:id", productsController.deleteOne);

export default routes;
