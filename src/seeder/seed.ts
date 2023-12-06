import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { options } from "../config/dataSource";
import { BooksFactory, MainSeeder } from "../seeder/books.factory";

const seedOptions: DataSourceOptions & SeederOptions = {
  ...options,
  factories: [BooksFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(seedOptions);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
  })
  .then(() => console.log("Database seeded successfully."))
  .catch((e) => console.error(e))
  .finally(() => process.exit());
