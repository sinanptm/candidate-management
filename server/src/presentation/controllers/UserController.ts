import { NextFunction, Request, Response } from "express";
import LoginUserUseCase from "../../use_case/auth/AuthUserUseCase";
import UserUseCase from "../../use_case/UserUseCase";
import { NODE_ENV } from "../../config/env";
import { CustomRequest, StatusCode } from "../../types";

export default class UserController {
    constructor(
        private readonly loginUseCase: LoginUserUseCase,
        private readonly userUseCase: UserUseCase
    ) { }

    async updateUserProfile(req: CustomRequest, res: Response, next: NextFunction){
        try {
            const userId = req.user?.id!;
            const data = req.body;

            const { user } = await this.userUseCase.updateUserProfile(userId, data);

            res.status(StatusCode.Success).json(user);
        } catch (error) {
            next(error)
        }
    }

    async getUserProfile(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id!;
            const { user } = await this.userUseCase.getUserProfile(userId);

            res.status(StatusCode.Success).json(user);

        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const { accessToken, refreshToken } = await this.loginUseCase.exec(email, password);

            res.cookie("user_token", refreshToken, {
                httpOnly: true,
                secure: NODE_ENV === 'productions',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'lax'
            });

            res.status(StatusCode.Success).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const userToken = req.cookies?.user_token;

            if (!userToken) {
                res.status(StatusCode.Forbidden).json({ message: "Unauthenticated: Not token provided" });
                return;
            };
            const { accessToken } = await this.loginUseCase.refreshAccessToken(userToken);

            res.status(StatusCode.Success).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }
}