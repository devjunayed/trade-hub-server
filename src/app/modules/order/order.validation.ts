import { z } from "zod";

const orderValidationSchema = z.object({
  body: z.object({
    products: z
      .array(
        z.object({
          productId: z.string().nonempty({ message: "Product ID is required" }),
          quantity: z
            .number()
            .min(1, { message: "Quantity must be at least 1" })
            .int({ message: "Quantity must be an integer" }),
        })
      )
      .nonempty({ message: "At least one product is required" }),
    payableAmount: z
      .number()
      .positive({ message: "Payable amount must be positive" }),
    paymentStatus: z.enum(["paid", "pending", "canceled"]).default("pending"),
  }),
});

export { orderValidationSchema };
