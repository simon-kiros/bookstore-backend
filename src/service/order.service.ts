import { Order, StatusType } from "../entity/order.entity";
import { OrderRepository } from "../repository/order.repository";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";

export const findById = async (id: number) => {
  return await OrderRepository.findOneBy({ id });
};

export const create = async (body: Partial<Order>) => {
  try {
    const user = await UserRepository.findOneBy({ id: body.user });
    const order = await OrderRepository.create(body);
    return Promise.all([user, order]).then((values) => {
      if (values[0] !== null && values[0]?.wallet > values[1].price) {
        const currentPoint = values[0]?.wallet - values[1].price;
        const usr = {
          ...values[0],
          ...{ wallet: currentPoint },
        };
        UserRepository.save(usr);
        return OrderRepository.save(values[1]);
      }
      return null;
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const findByUser = async (id: number) => {
  try {
    return await OrderRepository.find({
      where: [
        { user: id, status: StatusType.COMPLETED },
        { user: id, status: StatusType.PENDING },
      ],
      order: {
        id: "DESC",
      },
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const cancelOrder = async (id: number) => {
  try {
    return await findById(id).then((order) => {
      if (order)
        UserRepository.findOneBy({ id: order.user }).then((user) => {
          if (user && order)
            UserRepository.save({
              ...user,
              ...{ wallet: user?.wallet + order?.price },
            });
        });

      OrderRepository.save({
        ...order,
        ...{ status: StatusType.CANCELED },
      });
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const receivedOrder = async (id: number) => {
  try {
    const order = await findById(id);
    return await OrderRepository.save({
      ...order,
      ...{ status: StatusType.COMPLETED },
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};
