import { Order } from "../entity/order.entity";
import { dataSource } from "../config/dataSource";

export const OrderRepository = dataSource.getRepository(Order);
