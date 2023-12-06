import * as orderService from "../service/order.service";
import { RequestHandler } from "express";

export const create: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const order = await orderService.create(body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const findByUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const order = await orderService.findByUser(parseInt(userId));
    console.dir(order);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const cancelOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.cancelOrder(parseInt(id));
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const receivedOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.receivedOrder(parseInt(id));
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
