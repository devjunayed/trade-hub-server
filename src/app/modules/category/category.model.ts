import { model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model<TCategory>("category", categorySchema);

export default Category;
