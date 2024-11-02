import { Router } from "express";
import { OrderControllers } from "./order.controller";
import { auth } from "../../middlewares/auth";
import { TRole } from "../user/user.interface";

const router = Router();

router.post("/", auth(TRole.USER), OrderControllers.createOrder)

export const OrderRoutes = router;