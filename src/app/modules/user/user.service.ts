import { Request } from "express";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchFields } from "./user.constant";
import { createToken } from "../auth/auth.utils";
import config from "../../config";

// Creating user into db
const createUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already exist");
  }

  // checking if user is trying to be admin
  if (payload.role === "admin") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not permitted to be an admin"
    );
  }

  if (!(payload.password === payload.confirmPassword)) {
    throw new AppError(httpStatus.CONFLICT, "Password do not matched");
  }

  delete payload.confirmPassword;

  const result = await User.create(payload);

  // creating jwt payload
  const jwtPayload = {
    userId: result._id as unknown as string,
    role: result.role,
  };

  // generating access token
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires_in as string
  );

  return { accessToken, user };

};

// creating user only accessed by admin
const createUserByAdminIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// getting all user information
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchFields)
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  console.log(result);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).find({ isDeleted: { $ne: true } });
  return result;
};

const updateUserIntoDB = async (req: Request) => {
  const id = req.params.id;
  const payload = req.body;
  const userRole = req?.user?.role;

  // getting user data by id
  const user: TUser[] = await User.findById(id).find({
    isDeleted: { $ne: true },
  });

  if (!user || user.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "User is deleted");
  }

  if (userRole !== "admin" && payload?.role === "admin") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You aren't authorized of making admin"
    );
  }

  if (
    userRole !== "admin" &&
    (req?.user?.userId as string) !== user[0]?._id?.toString()
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You can't change others information"
    );
  }

  const updateUser = await User.findByIdAndUpdate(id, payload);

  const result = await User.findById(updateUser!._id);

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const deletedUser = await User.findByIdAndUpdate(id, { isDeleted: true });

  const result = await User.findById(deletedUser!._id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createUserByAdminIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
