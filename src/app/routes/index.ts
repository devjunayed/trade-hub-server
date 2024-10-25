import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();

const routes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/user", route: UserRoutes },
  { path: "/category", route: CategoryRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
