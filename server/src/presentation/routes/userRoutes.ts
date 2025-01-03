import { Router } from "express";
import UserController from "../controllers/UserController";
import UserUseCase from "../../use_case/UserUseCase";
import TokenService from "../../infrastructure/service/TokenService";
import UserRepository from "../../infrastructure/repository/UserRepository";
import AuthUserUseCase from "../../use_case/auth/AuthUserUseCase";
import HashService from "../../infrastructure/service/HashService";
import UserAuthMiddleware from "../middlewares/UserAuthMiddleware";
import CloudService from "../../infrastructure/service/CloudService";

const userRoutes = Router();

const tokenService = new TokenService();
const userRepository = new UserRepository();
const hashService = new HashService();
const cloudService = new CloudService()

const authUserUseCase = new AuthUserUseCase(userRepository, tokenService, hashService);
const userUseCase = new UserUseCase(userRepository, cloudService);

const userController = new UserController(authUserUseCase, userUseCase);
const userAuthMiddleware = new UserAuthMiddleware(tokenService);


userRoutes.post("/login", userController.login.bind(userController));
userRoutes.delete("/logout", userController.logout.bind(userController));

userRoutes.use(userAuthMiddleware.exec.bind(userAuthMiddleware));
userRoutes.get("/profile", userController.getUserProfile.bind(userController));
userRoutes.put("/profile", userController.updateUserProfile.bind(userController));
userRoutes.patch("/create-url",userController.createPresignedUrl.bind(userController));
userRoutes.put("/update-file",userController.updateFile.bind(userController));

export default userRoutes;