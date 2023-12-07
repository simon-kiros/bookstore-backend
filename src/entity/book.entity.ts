/**
 * @swagger
 * components:
 * schemas:
 *   Book:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         description: The unique identifier for the book.
 *       title:
 *         type: string
 *         description: The title of the book.
 *       writer:
 *         type: string
 *         description: The name of the writer/author of the book.
 *       cover:
 *         type: string
 *         format: url
 *         description: URL to the book's cover image.
 *       price:
 *         type: number
 *         format: float
 *         description: The price of the book.
 *       tag:
 *         type: array
 *         items:
 *           type: string
 *         nullable: true
 *         description: Tags associated with the book.
 *       description:
 *         type: string
 *         description: A brief description of the book.
 *
 */

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column({
    default:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  })
  cover: string;

  @Column()
  price: number;

  @Column("text", { array: true, nullable: true })
  tag: string[];

  @Column()
  description: string;
}
