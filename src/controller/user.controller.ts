import * as userService from "../service/user.service";
import { RequestHandler } from "express";
import passport from "passport";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import bcrypt from "bcryptjs";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await userService.create(body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    console.log(result);
    if (result.message === "failed") {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    res
      .status(200)
      .json({ message: "Authentication successful", id: result.id });
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  res.status(401).json({ message: "Authentication failed" });
};

export const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(parseInt(id));
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
