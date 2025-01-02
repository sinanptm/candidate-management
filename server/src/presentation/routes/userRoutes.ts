import { Router } from "express";
import UserController from "../controllers/UserController";
import UserUseCase from "../../use_case/UserUseCase";
import TokenService from "../../infrastructure/service/TokenService";
import UserRepository from "../../infrastructure/repository/UserRepository";
import AuthUserUseCase from "../../use_case/auth/AuthUserUseCase";
import HashService from "../../infrastructure/service/HashService";
import UserAuthMiddleware from "../middlewares/UserAuthMiddleware";

const userRoutes = Router();

const tokenService = new TokenService();
const userRepository = new UserRepository();
const hashService = new HashService();

const authUserUseCase = new AuthUserUseCase(userRepository, tokenService, hashService);
const userUseCase = new UserUseCase(userRepository);

const userController = new UserController(authUserUseCase, userUseCase);
const userAuthMiddleware = new UserAuthMiddleware(tokenService);


userRoutes.post("/login", userController.login.bind(userController));

userRoutes.use(userAuthMiddleware.exec.bind(userAuthMiddleware));
userRoutes.get("/profile", userController.getUserProfile.bind(userController));


export default userRoutes;