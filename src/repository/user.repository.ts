import { User } from "../entity/user.entity";
import { dataSource } from "../config/dataSource";

export const UserRepository = dataSource.getRepository(User);
