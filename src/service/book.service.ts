import { Book } from "../entity/book.entity";
import { BookRepository } from "../repository/book.repository";
import ParamType from "../type/ParamType";
import { ILike, ArrayContains } from "typeorm";

export const findAll = async (query: ParamType): Promise<Book[]> => {
  const take = query.take || 10;
  const skip = query.skip || 0;
  const keyword = query.keyword || "";
  const tag = query.tag ? { tag: ArrayContains([query.tag]) } : {};
  return await BookRepository.find({
    where: { title: ILike(`%${keyword}%`), ...tag },
    order: { id: "ASC" },
    take: take,
    skip: skip,
  });
};

export const findById = async (id: string) => {
  return await BookRepository.findOneBy({ id: parseInt(id) });
};

export const create = async (body: Book) => {
  try {
    console.log("inside book service");
    console.log(body);
    const obj = new Book();
    obj.title = body.title;
    obj.writer = body.writer;
    obj.price = body.price;
    obj.cover = body.cover;
    obj.tag = body.tag;
    obj.description = body.description;
    const row = await BookRepository.create(obj);
    return await BookRepository.save(row);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const update = async (id: string, body: Book) => {
  try {
    const row = await findById(id);
    const obj = new Book();
    obj.title = body.title;
    obj.writer = body.writer;
    obj.price = body.price;
    obj.cover = body.cover;
    obj.tag = body.tag;
    obj.description = body.description;
    if (!row) return null;
    return await BookRepository.save({ ...row, ...obj });
  } catch (err) {
    return err;
  }
};

export const remove = async (id: string) => {
  const row = await findById(id);
  if (!row) return null;
  return await BookRepository.remove(row);
};
