import { Router } from "express";
import AuthAdminUseCase from "../../use_case/auth/AuthAdminUseCase";
import UserRepository from "../../infrastructure/repository/UserRepository";
import TokenService from "../../infrastructure/service/TokenService";
import AdminController from "../controllers/AdminController";
import AdminAuthMiddleWare from "../middlewares/AdminAuthMiddleware";
import AdminUseCase from "../../use_case/AdminUseCase";
import HashService from "../../infrastructure/service/HashService";
import CloudService from "../../infrastructure/service/CloudService";

const adminRoutes = Router();

const userRepository = new UserRepository();
const tokenService = new TokenService();
const hashService = new HashService();
const cloudService = new CloudService()

const authAdminUseCase = new AuthAdminUseCase(userRepository, tokenService);
const adminUseCase = new AdminUseCase(userRepository, hashService, cloudService);
const adminController = new AdminController(authAdminUseCase, adminUseCase);
const adminAuthMiddleware = new AdminAuthMiddleWare(tokenService);


adminRoutes.post("/login", adminController.login.bind(adminController));
adminRoutes.delete('/logout', adminController.logout.bind(adminController));
adminRoutes.post("/refresh",adminController.refreshToken.bind(adminController));

adminRoutes.use(adminAuthMiddleware.exec.bind(adminAuthMiddleware));

adminRoutes.post("/candidates/create",adminController.createUser.bind(adminController));
adminRoutes.delete("/candidates/:id",adminController.deleteUser.bind(adminController));
adminRoutes.get("/candidates",adminController.getUsers.bind(adminController));

export default adminRoutes;