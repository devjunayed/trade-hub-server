import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import { auth } from "../../middlewares/auth";
import { TRole } from "../user/user.interface";

const router = Router();

// creating product
router.post(
  "/create-product",
 auth(TRole.ADMIN),
  validateRequest(productValidation.createProductValidationSchema),
  ProductController.createProduct
);

// getting all product
router.get("/", ProductController.getAllProduct);

// getting single product
router.get("/:id", ProductController.getSingleProduct);

// updating a product
router.patch(
  "/:id",
  validateRequest(productValidation.updateProductValidationSchema),
  ProductController.updateProduct
);

// updating a product
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
