import { Request } from "express";
import Product from "../product/product.model";
import { TOrderProducts } from "./order.interface";
import User from "../user/user.model";

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

  console.log(paymentData)
};

export const OrderServices = {
  createOrderIntoDb,
};
