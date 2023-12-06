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
