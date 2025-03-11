import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatsServices } from "./stats.services";
import httpStatus from "http-status";

const orderStatsController = catchAsync(async (req, res) => {
  const result = await StatsServices.orderStatsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All order retrieved successfully!",
    data: result,
  });
});

export const StatsControllers = {
  orderStatsController,
};
