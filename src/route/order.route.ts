import express from "express";
import * as orderController from "../controller/order.controller";
const Router = express.Router();

Router.get("/api/bookstore/orders/:userId", orderController.findByUser);
Router.post("/api/bookstore/orders/", orderController.create);
Router.get("/api/bookstore/orders/cancel/:id", orderController.cancelOrder);
Router.get("/api/bookstore/orders/received/:id", orderController.receivedOrder);

export { Router as orderRouter };
