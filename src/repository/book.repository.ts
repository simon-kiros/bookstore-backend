import { Book } from "../entity/book.entity";
import { dataSource } from "../config/dataSource";

export const BookRepository = dataSource.getRepository(Book);
