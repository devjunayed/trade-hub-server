import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;
