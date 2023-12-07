/**
 * @swagger
 * /api/bookstore/books/:
 *   get:
 *     tag: "test"
 *     summary: Retrieve all books
 *     description: Get all books from the bookstore
 *     responses:
 *       '200':
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     description: Add a new book to the bookstore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 * /api/bookstore/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Get a book from the bookstore by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *   put:
 *     summary: Update a book by ID
 *     description: Update a book in the bookstore by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *   delete:
 *     summary: Delete a book by ID
 *     description: Delete a book from the bookstore by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Book deleted successfully
 */

import express from "express";
import * as BookController from "../controller/book.controller";
const Router = express.Router();

Router.get("/api/bookstore/books/", BookController.findAll);
Router.post("/api/bookstore/books/", BookController.create);
Router.get("/api/bookstore/books/:id", BookController.findById);
Router.put("/api/bookstore/books/:id", BookController.update);
Router.delete("/api/bookstore/books/:id", BookController.remove);

export { Router as bookRouter };
