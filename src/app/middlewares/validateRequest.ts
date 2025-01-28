import { AnyZodObject, z } from "zod";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('hitting validate request');
    console.log(req.body);
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
