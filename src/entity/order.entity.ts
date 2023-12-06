import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

export enum StatusType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user, {
  //   eager: true,
  // })
  //@JoinColumn()
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
