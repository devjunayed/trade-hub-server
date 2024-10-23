import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

export const UserController = {
  createUser,
};
