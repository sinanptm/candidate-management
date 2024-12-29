
import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types";
import CustomError from "../../domain/entities/CustomErrors";

export default class ErrorHandler {
    constructor() {
        this.exec.bind(this);
    }
    exec(err: any, req: Request, res: Response, next: NextFunction) {
        const statusCode = err.statusCode || StatusCode.InternalServerError;
        const message = err.message || 'Unknown Error Occurred';
        const stack = err.stack;

        if (err instanceof CustomError) {
            console.error(err);
            res.status(statusCode).json({ message });
            return;
        }

        console.error(err, { stack });

        res.status(statusCode).json({ message });
    }
}