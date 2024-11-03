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
      data: {...data.result.toJSON(), paymentURL: data.paymentResponse}
    });
})

export const OrderControllers = {
    createOrder
}