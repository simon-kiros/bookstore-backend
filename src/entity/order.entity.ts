import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

export enum StatusType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  book_quantity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    nullable: true,
    type: "enum",
    enum: StatusType,
    default: StatusType.PENDING,
  })
  status: StatusType;
}
