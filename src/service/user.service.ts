import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import bcrypt from "bcryptjs";

export const create = async (body: User) => {
  try {
    const obj = new User();
    obj.username = body.username;
    obj.password = await bcrypt.hash(body.password, 10);
    obj.fullName = body.fullName;
    obj.wallet = 100;
    const row = await UserRepository.create(obj);
    const user = await UserRepository.save(row);
    return {
      message: "Authentication Successful",
      code: 200,
      userId: user.id,
    };
  } catch (err) {
    console.error(err);
    return {
      message: "failed",
    };
  }
};

export const findByUserName = async (username: string) => {
  return await UserRepository.findOneBy({ username });
};

export const findById = async (id: number) => {
  const user = await UserRepository.findOneBy({ id });
  return {
    fullName: user?.fullName,
    wallet: user?.wallet,
    username: user?.username,
  };
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await UserRepository.findOne({ where: { username } });
  if (!user) return { message: "failed" };
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return { message: "failed" };
  return { message: "success", id: user.id };
};
