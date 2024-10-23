import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

// creating user
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

// getting all user data
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User retrieved successfully!",
    data: result,
  });
});


// getting a single user data using id
const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleUserFromDB(req.params.id);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});


// updating a single user data using id and it's new data
const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIntoDB(req.params.id, req.body);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

// deleting a single user  using id
const deleteUser = catchAsync(async (req, res) => {
  const result = await UserServices.deleteUserFromDB(req.params.id);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully!",
    data: result,
  });
});


// exporting all controllers
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
  
};
