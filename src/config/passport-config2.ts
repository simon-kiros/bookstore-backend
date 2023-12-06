// import PassportStatic from "passport";
// import passport from "passport";
// import { RequestHandler } from "express";
// import { Strategy as LocalStrategy } from "passport-local";
// import bcrypt from "bcryptjs";
// import { User } from "../entity/user.entity";
// import { UserRepository } from "../repository/user.repository";

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await UserRepository.findOne({ where: { username } });

//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }

//       const isValidPassword = await bcrypt.compare(password, user.password);
//       if (!isValidPassword) {
//         return done(null, false, { message: "Incorrect password." });
//       }

//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// passport.serializeUser((user, done) => done(null, user.id));

// passport.deserializeUser(async (id: number, done) => {
//   const user = await UserRepository.findBy({ id });
//   done(null, user);
// });

// export const checkAuthenticated: RequestHandler = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect("/users/dashboard");
//   }
//   next();
// };

// export const checkNotAuthenticated: RequestHandler = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/users/login");
// };
