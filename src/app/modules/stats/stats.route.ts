import { Router } from "express";
import { StatsControllers } from "./stats.controller";

const router = Router();

router.get("/orders-stats", StatsControllers.orderStatsController);
router.get("/users-stats", StatsControllers.usersStatsController);

export const StatsRoutes =  router;

