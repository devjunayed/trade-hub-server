import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email address format"),
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
    phone: z
      .string({
        required_error: "Phone is required",
        invalid_type_error: "Phone must be a string",
      })
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    role: z
      .enum(["user", "admin"], {
        required_error: "Role is required",
        invalid_type_error: 'Role must be either "user" or "admin"',
      })
      .default("user"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email address format")
      .optional(),
    address: z
      .string({
        invalid_type_error: "Address must be a string",
      })
      .optional(),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .optional(),
    phone: z
      .string({
        invalid_type_error: "Phone must be a string",
      })
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
      .optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
