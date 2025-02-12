import { Request } from "express";
import Product from "../product/product.model";
import { TOrderProducts } from "./order.interface";
import User from "../user/user.model";
import { initiatePayment } from "../payment/payment.utils";
import Order from "./order.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrderIntoDb = async (req: Request) => {
  const userId = req?.user?.userId;

  //   finding user
  const user = await User.findById(userId);

  // getting all products from backend using id
  const products = await Product.find({
    $or: req.body.products.map((product: TOrderProducts) => ({
      _id: product.productId,
    })),
  });

  const totalPrice = req.body.products.reduce(
    (acc: number, product: TOrderProducts) => {
      const matchedProduct = products.find(
        (p) => p._id.toString() === product.productId
      );
      return matchedProduct
        ? acc + matchedProduct.price * product.quantity
        : acc;
    },
    0
  );

  //    transaction id
  const transactionId = `TXN-${Date.now()}`;
  const paymentData = {
    transactionId,
    totalPrice,
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
  };

  const paymentResponse = await initiatePayment(paymentData);

  const result = await Order.create({
    userId,
    transactionId,
    ...req.body,
    totalPrice,
  });

  return { result, paymentResponse };
};

const getAllOrderFromDb = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find({ isDeleted: { $ne: true } }).populate("productId"),
    query
  )
    .search(["productId", "name", "description", "transactionId"])
    .filter()
    .sort()
    .paginate();

  const data = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return { data, meta };
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrderFromDb
};
