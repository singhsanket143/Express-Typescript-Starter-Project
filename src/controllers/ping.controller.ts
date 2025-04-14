import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { NotFoundError } from "../utils/errors/app.error";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fs.readFile("sample");
        res.status(200).json({ message: "Pong!" });
    } catch (error) {
        throw new NotFoundError("File not found");
    }
}
