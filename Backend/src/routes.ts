import express from "express";
import SalesController from "./controllers/SalesController";
import ServiceOrdersController from "./controllers/ServiceOrdersController";
import ProductsController from "./controllers/ProductsController";
import ClientsController from "./controllers/ClientsController";
import SummaryController from "./controllers/SummaryController";

const routes = express.Router();
const salesController = new SalesController();
const soControllers = new ServiceOrdersController();
const productsController = new ProductsController();
const clientsController = new ClientsController();
const summaryController = new SummaryController();

routes.get("/vendas", salesController.index);
routes.get("/vendas/:id", salesController.show);
routes.get("/getvendas/numero", salesController.getNumMax);
routes.post("/vendas", salesController.create);
routes.put("/vendas/:id", salesController.change);
routes.delete("/vendas/", salesController.delete);
// routes.delete("/vendas/:id", salesController.deleteOne);

routes.get("/os", soControllers.index);
routes.get("/os/:id", soControllers.show);
routes.get("/getos/numero", soControllers.getNumMax);
routes.post("/os", soControllers.create);
routes.put("/os/:id", soControllers.change);
// routes.delete("/os/", soControllers.delete);
// routes.delete("/os/:id", soControllers.deleteOne);

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

routes.get("/resumo", summaryController.index);
routes.get("/resumoSomas", summaryController.sumOperations);

export default routes;
