import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = Router();

// creating category
router.post(
  "/create-category",
  validateRequest(categoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

// getting all category
router.get("/", CategoryController.getAllCategory);

// getting single category
router.get("/:id", CategoryController.getSingleCategory);

// updating a category
router.patch(
  "/:id",
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory
);

// updating a category
router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
