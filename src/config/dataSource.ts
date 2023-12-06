import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { User } from "../entity/user.entity";
import { Book } from "../entity/book.entity";
import { Order } from "../entity/order.entity";

const port = process.env.DB_PORT as number | undefined;

export const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Book, Order],
  synchronize: true,
};

export const dataSource = new DataSource(options);

export async function initialiseDB(retries = 1): Promise<boolean> {
  return dataSource
    .initialize()
    .then(() => true)
    .catch((err) => {
      const remainingRetries = retries - 1;
      console.warn(
        `Could not connect to the database, retrying ${remainingRetries} more time(s)`
      );
      if (remainingRetries === 0) {
        console.error(`Error during Data Source initialisation:`, err);
        return false;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          initialiseDB(remainingRetries).then(resolve);
        }, 5000);
      });
    });
}
