import { Faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import {
  Seeder,
  SeederFactoryManager,
  setSeederFactory,
} from "typeorm-extension";
import { Book } from "../entity/book.entity";

export const BooksFactory = setSeederFactory(Book, (faker: Faker) => {
  const book = new Book();
  const allTags = ["fiction", "non-fiction", "science", "essay"];
  const num = faker.number.int({ min: 0, max: 3 });
  const tags: Set<string> = new Set<string>();
  for (let i = 0; i <= num; i++) {
    tags.add(allTags[faker.number.int(3)]);
  }
  book.title = faker.commerce.department();
  book.writer = faker.person.fullName();
  book.price = faker.number.int({ min: 5, max: 30 });
  book.cover =
    "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg";
  book.tag = Array.from(tags);
  book.description = faker.lorem.paragraph();
  return book;
});

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const bookFactory = factoryManager.get(Book);
    await bookFactory.saveMany(100);
  }
}
