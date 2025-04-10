import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UiConfigServices } from "./uiconfig.service";

const increaseSiteViewCount= catchAsync(async (req, res) => {
    const result = await UiConfigServices.increaseSiteViewCountIntoDb();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vistor increased",
        data: result
      });
})

const updateSettings= catchAsync(async (req, res) => {
    const result = await UiConfigServices.updateSettingsIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Settings updated successfully",
        data: result
      });
})

export const uiConfigController = {
    increaseSiteViewCount,
    updateSettings
}