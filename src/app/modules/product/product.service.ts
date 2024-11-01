import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Product from "./product.model";
import { TProduct } from "./product.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { query } from "express";
import { Query } from "mongoose";

// creating product into db
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// getting all product from db
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query);
  const result = await productQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).find({ isDeleted: { $ne: true } });
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id).find({ isDeleted: { $ne: true } });

  if (!product || product.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Product is deleted");
  }

  const updateProduct = await Product.findByIdAndUpdate(id, payload);

  const result = await Product.findById(updateProduct!._id);

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true });

  const result = await Product.findById(deletedProduct!._id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
