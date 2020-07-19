import express from "express";
import SalesController from "./controllers/SalesController";
import ProductsController from "./controllers/ProductsController";
import ClientsController from "./controllers/ClientsController";

const routes = express.Router();
const salesController = new SalesController();
const productsController = new ProductsController();
const clientsController = new ClientsController();

routes.get("/vendas", salesController.index);
routes.get("/vendas/:id", salesController.show);
routes.get("/getvendas/numero", salesController.getNumMax);
routes.post("/vendas", salesController.create);
// routes.put("/vendas/:id", salesController.change);
// routes.delete("/vendas/", salesController.delete);
// routes.delete("/vendas/:id", salesController.deleteOne);

routes.get("/produtos", productsController.index);
routes.get("/produtos/:id", productsController.show);
routes.get("/produtos/barcode/:codBarras", productsController.searchByBarCode);
routes.post("/produtos", productsController.create);
routes.put("/produtos/:id", productsController.change);
routes.delete("/produtos/", productsController.delete);
routes.delete("/produtos/:id", productsController.deleteOne);

routes.get("/clientes", clientsController.index);
routes.get("/clientes/:id", clientsController.show);
routes.get("/clientes/cpf/:cpf", clientsController.searchByCPF);
routes.post("/clientes", clientsController.create);
routes.put("/clientes/:id", clientsController.change);
routes.delete("/clientes/", clientsController.delete);
routes.delete("/clientes/:id", clientsController.deleteOne);

export default routes;
