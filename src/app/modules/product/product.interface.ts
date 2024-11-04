import { Types } from "mongoose";

export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Types.ObjectId;
  productImage: string;
  isDeleted: boolean;
};
