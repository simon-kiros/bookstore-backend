import express from "express";
import * as BookController from "../controller/book.controller";
import { checkNotAuthenticated } from "../config/passport-config";
import { Book } from "../entity/book.entity";
const Router = express.Router();

Router.get("/api/bookstore/books/", BookController.findAll);
Router.post("/api/bookstore/books/", BookController.create);
Router.get("/api/bookstore/books/:id", BookController.findById);
Router.put("/api/bookstore/books/:id", BookController.update);
Router.delete("/api/bookstore/books/:id", BookController.remove);

export { Router as bookRouter };
