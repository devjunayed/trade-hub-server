import { Router } from "express";
import { StatsControllers } from "./stats.controller";

const router = Router();

router.get("/", StatsControllers.orderStatsController);

export const StatsRoutes =  router;

