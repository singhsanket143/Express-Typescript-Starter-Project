import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

/**
 * 
 * @param schema - Zod schema to validate the request body
 * @returns - Middleware function to validate the request body
 */
export const validateRequestBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            await schema.parseAsync(req.body);
            console.log("Request body is valid");
            next();

        } catch (error) {
            // If the validation fails, 

            return res.status(400).json({
                message: "Invalid request body",
                success: false,
                error: error
            });
            
        }
    }
}

export const validateQueryParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            await schema.parseAsync(req.query);
            console.log("Query params are valid");
            next();

        } catch (error) {
            // If the validation fails, 

            return res.status(400).json({
                message: "Invalid query params",
                success: false,
                error: error
            });
            
        }
    }
}
