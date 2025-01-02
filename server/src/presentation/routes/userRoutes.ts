import { Router } from "express";
import UserController from "../controllers/UserController";
import UserUseCase from "../../use_case/UserUseCase";
import TokenService from "../../infrastructure/service/TokenService";
import UserRepository from "../../infrastructure/repository/UserRepository";
import AuthUserUseCase from "../../use_case/auth/AuthUserUseCase";
import HashService from "../../infrastructure/service/HashService";

const userRoutes = Router();

const tokenService  = new TokenService();
const userRepository = new UserRepository();
const hashService = new HashService()

const authUserUseCase = new AuthUserUseCase(userRepository, tokenService, hashService)
const userUseCase = new UserUseCase(userRepository)

const userController = new UserController(authUserUseCase, userUseCase);


userRoutes.post("/login",userController.login.bind(userController));


export default userRoutes;