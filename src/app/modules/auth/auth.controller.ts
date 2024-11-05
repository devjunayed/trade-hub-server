import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async(req, res) => {
    const result = await AuthServices.loginUserIntoDB(req.body);

    res.cookie('token', result.accessToken)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: result.user,
        token: result.accessToken
      });
})
const refreshToken = catchAsync(async(req, res) => {
    const {refreshToken} = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token retrieved successfully!",
        data: result,
      });
})

export const AuthController = {
    loginUser,
    refreshToken
}