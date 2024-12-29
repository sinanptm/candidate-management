import { NextFunction, Request, Response } from "express";
import AuthAdminUseCase from "../../use_case/admin/AuthAdminUseCase";
import { StatusCode } from "../../types";

export default class AdminController {
    constructor(
       private  readonly authUseCase: AuthAdminUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const { accessToken, refreshToken } = await this.authUseCase.exec(username, password);

            res.cookie("admin_token", refreshToken, {
                httpOnly: true,
                maxAge: 6000 * 30,
                secure: true
            });

            res.status(StatusCode.Success).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }

    async logout (req: Request, res: Response, next: NextFunction){
        res.clearCookie("admin_token");
        res.status(StatusCode.Success).json({message:"Cookie Cleared"})
    }
}