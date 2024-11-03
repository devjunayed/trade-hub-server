import { model, Schema } from "mongoose";
import { TOrder, TOrderProducts } from "./order.interface";

const orderProductsSchema = new Schema<TOrderProducts>({
  productId: { type: String, ref: "product", required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<TOrder>({
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  products: [orderProductsSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "canceled"],
    default: "pending",
  },
});

const Order = model("Order", orderSchema);

export default Order;
