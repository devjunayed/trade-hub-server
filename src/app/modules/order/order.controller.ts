import { catchAsync } from "../../utils/catchAsync";
import { OrderServices } from "./order.service";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";

const createOrder = catchAsync(async(req: Request, res: Response) => {
    const result = await OrderServices.createOrderIntoDb(req);


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order placed successfully!",
      data: result,
    });
})

export const OrderControllers = {
    createOrder
}