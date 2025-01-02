import { NextFunction, Response } from "express";
import ITokenService from "../../domain/interfaces/services/ITokenService";
import { CustomRequest, StatusCode, UserRole } from "../../types";

export default class UserAuthMiddleware {
    constructor(
        private readonly tokenService: ITokenService
    ) { }

    exec(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
                const tokenString = authHeader.split(" ")[1];
                const { email, id, role } = this.tokenService.verifyAccessToken(tokenString);
                if (id && email && role === UserRole.User) {
                    req.user = { id, email };
                    return next();
                }
            }

            next();
        } catch (error: any) {
            res.status(error.statusCode || StatusCode.Unauthorized).json({ message: error.message });
            console.log(error);
            
        }
    }
}