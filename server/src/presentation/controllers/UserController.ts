import { NextFunction } from "express";
import LoginUserUseCase from "../../use_case/auth/AuthUserUseCase";

export default class UserController {
    constructor(
       private readonly loginUseCase: LoginUserUseCase
    ){}

    async login(req:Request, res:Response, next:NextFunction){
        
    }
}