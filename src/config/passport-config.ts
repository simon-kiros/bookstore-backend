import PassportStatic from "passport";
import { RequestHandler } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

export const initializePassport = (passport: any) => {
  console.log("Initialized");

  const authenticateUser = async (
    username: string,
    password: string,
    done: any
  ) => {
    console.log(username, password);
    const user = await UserRepository.findOne({ where: { username } });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user: User, done: any) => done(null, user.id));

  passport.deserializeUser(async (id: number, done: any) => {
    const user = await UserRepository.findBy({ id });
    done(null, user);
  });
};

export const checkAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
};

export const checkNotAuthenticated: RequestHandler = (req, res, next) => {
  console.log(req.session.userId);
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }
};
