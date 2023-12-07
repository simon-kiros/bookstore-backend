import express from "express";
import * as userController from "../controller/user.controller";

const Router = express.Router();

Router.post("/api/bookstore/auth/signup", userController.signup);
Router.post("/api/bookstore/auth/login", userController.login);
Router.get("/api/bookstore/auth/logout", userController.logout);
Router.get("/api/bookstore/auth/user/:id", userController.read);

export { Router as userRouter };
