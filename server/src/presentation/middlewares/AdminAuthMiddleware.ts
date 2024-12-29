import { NextFunction, Request, Response } from "express";
import ITokenService from "../../domain/interfaces/ITokenService";
import { StatusCode, UserRole } from "../../types";

export default class AdminAuthMiddleWare {
    constructor(
        private readonly tokenService: ITokenService
    ) { }

    exec(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
                const tokenString = authHeader.split(" ")[1];
                const { email, id, role } = this.tokenService.verifyAccessToken(tokenString);
                if (id && email && role === UserRole.Admin) {
                    return next();
                }
            }

            res.status(StatusCode.Unauthorized).json({ message: "Invalid token provided" });
        } catch (error: any) {
            res.status(error.statusCode || StatusCode.Unauthorized).json({ message: error.message });
        }
    }
}