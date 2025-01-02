import { NextFunction, Request, Response } from "express";
import AuthAdminUseCase from "../../use_case/auth/AuthAdminUseCase";
import { StatusCode } from "../../types";
import AdminUseCase from "../../use_case/AdminUseCase";
import { NODE_ENV } from "../../config/env";

export default class AdminController {
    constructor(
        private readonly authUseCase: AuthAdminUseCase,
        private readonly adminUseCase: AdminUseCase
    ) { }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.adminUseCase.getUsers();

            res.status(StatusCode.Success).json({ users });
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;
            const createdUser = await this.adminUseCase.createUser(user);

            res.status(StatusCode.Success).json({ user: createdUser });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await this.adminUseCase.deleteUser(id);

            res.status(StatusCode.Success).json({ message: "User Deleted Successfully" });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const adminToken = req.cookies?.admin_token;

            if (!adminToken) {
                res.status(StatusCode.Forbidden).json({ message: "Unauthenticated: Not token provided" });
                return;
            };
            const { accessToken } = await this.authUseCase.refreshAccessToken(adminToken);

            res.status(StatusCode.Success).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const { accessToken, refreshToken } = await this.authUseCase.exec(username, password);

            res.cookie("admin_token", refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                sameSite: 'lax',  
                secure: NODE_ENV === 'production',
                path: '/'
            });


            res.status(StatusCode.Success).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("admin_token");
        res.status(StatusCode.Success).json({ message: "Cookie Cleared" });
    }
}