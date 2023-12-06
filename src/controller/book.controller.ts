import { RequestHandler } from "express";
import * as bookService from "../service/book.service";

export const findAll: RequestHandler = async (req, res, next) => {
  try {
    const books = await bookService.findAll(req.query);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export const findById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const books = await bookService.findById(id);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    console.log("inside book create");
    //console.dir(req);
    const body = req.body;
    const book = await bookService.create(body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const book = await bookService.update(id, body);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await bookService.remove(id);
    res.status(200).json({ message: "ok" });
  } catch (err) {
    next(err);
  }
};
