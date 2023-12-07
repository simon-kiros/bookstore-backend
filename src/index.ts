import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { initialiseDB } from "./config/dataSource";
import { bookRouter } from "./route/book.route";
import { userRouter } from "./route/user.route";
import { orderRouter } from "./route/order.route";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDocument2 = require("./config/swagger.json");
const swaggerDocument3 = require("./config/swagger2.json");
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

app.use("/", bookRouter);
app.use("/", userRouter);
app.use("/", orderRouter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "API documentation for book-related operations",
    },
  },
  apis: [`${__dirname}/route/*.route.ts`], // Replace with the path to your routes file
};

// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerJsdoc(swaggerOptions))
// );

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument3));
});
