import express from "express";
import * as orderController from "../controller/order.controller";
const Router = express.Router();

Router.get("/:userId", orderController.findByUser);
Router.post("/", orderController.create);
Router.get("/cancel/:id", orderController.cancelOrder);
Router.get("/received/:id", orderController.receivedOrder);

export { Router as orderRouter };
