import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import config from "../../config";
import httpStatus from "http-status";

const loginUserIntoDB = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  // throwing error if user doesn't exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This is user doesn't exists");
  }
  console.log(user);

  // comparing password
  const hashedResult = await bcrypt.compare(payload.password, user.password);

  if (!hashedResult) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong credentials");
  }

  // creating jwt payload
  const jwtPayload = {
    userId: user._id as unknown as string,
    role: user.role,
  };

  // generating access token
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.expires_in as string
  );

  user.password = "";



  return {accessToken, user};
};

export const AuthServices = {
  loginUserIntoDB,
};
