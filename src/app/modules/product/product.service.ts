import AppError from "../../errors/AppError";
import User from "./product.model";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: { $ne: true } });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).find({ isDeleted: { $ne: true } });
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id).find({ isDeleted: { $ne: true } });

  if (!user || user.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "User is deleted");
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
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
