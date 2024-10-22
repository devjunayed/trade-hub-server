import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

});

export const UserController = {
    createUser
}
