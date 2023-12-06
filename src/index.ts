import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import passport from "passport";
import session from "express-session";
import flash from "express-flash";
import { initialiseDB } from "./config/dataSource";
import { bookRouter } from "./route/book.route";
import { userRouter } from "./route/user.route";
import { orderRouter } from "./route/order.route";
import { initializePassport } from "./config/passport-config";
import { swaggerSpec } from "./config/swagger";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDocument2 = require("./config/swagger.json");
const app: Application = express();
const port = process.env.PORT || 8000;

initialiseDB().then((isInitialised: boolean) => {
  if (isInitialised) console.log(`DataSource has been initialised!`);
  else console.error(`Could not initialise database connection`);
});

app.set("port", process.env.PORT || 8000);
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(methodOverride());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

//initializePassport(passport);
declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use("/", bookRouter);
app.use("/", userRouter);
app.use("/api/bookstore/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Express & TypeScript Server => ${__dirname}`);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument2));
});
