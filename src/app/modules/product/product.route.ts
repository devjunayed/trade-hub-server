import { Router } from "express";
import { UserController } from "./product.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./product.validation";

const router = Router();

// creating user
router.post(
  "/create-user",
  validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser
);

// getting all user
router.get("/", UserController.getAllUser);

// getting single user
router.get("/:id", UserController.getSingleUser);

// updating a user
router.patch(
  "/:id",
  validateRequest(userValidation.updateUserValidationSchema),
  UserController.updateUser
);

// updating a user
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
