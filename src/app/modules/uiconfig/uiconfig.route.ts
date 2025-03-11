import { Router } from "express";
import { uiConfigController } from "./uiconfig.controller";

const router = Router();

router.get("/inc-visit", uiConfigController.increaseSiteViewCount)

export const UiConfigRoutes = router;