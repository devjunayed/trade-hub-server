import { catchAsync } from "../../utils/catchAsync";
import { OrderServices } from "./order.service";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import httpStatus from "http-status";

const createOrder = catchAsync(async(req: Request, res: Response) => {
    const data = await OrderServices.createOrderIntoDb(req);

 


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order placed successfully!",
      data: {...data?.result?.toJSON(), paymentURL: data.paymentResponse}
    });
})

const getUsersAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getUsersAllOrderFromDb(req);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All order retrieved successfully!",
    data: result.data || [],
    meta: result.meta 
  });
});
const getAllOrders = catchAsync(async (req, res) => {

  const result = await OrderServices.getAllOrderFromDb(req.query);
  console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All order retrieved successfully!",
    data: result.data || [],
    meta: result.meta 
  });
});


export const OrderControllers = {
    createOrder,
    getAllOrders,
    getUsersAllOrders   
}