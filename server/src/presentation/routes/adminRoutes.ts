import { Router } from "express";
import AuthAdminUseCase from "../../use_case/auth/AuthAdminUseCase";
import UserRepository from "../../infrastructure/repository/UserRepository";
import TokenService from "../../infrastructure/service/TokenService";
import AdminController from "../controllers/AdminController";
import AdminAuthMiddleWare from "../middlewares/AdminAuthMiddleware";
import AdminUseCase from "../../use_case/AdminUseCase";

const adminRoutes = Router();

const userRepository = new UserRepository();
const tokenService = new TokenService();

const authAdminUseCase = new AuthAdminUseCase(userRepository, tokenService);
const adminUseCase = new AdminUseCase(userRepository);
const adminController = new AdminController(authAdminUseCase, adminUseCase);
const adminAuthMiddleware = new AdminAuthMiddleWare(tokenService);


adminRoutes.post("/login", adminController.login.bind(adminController));
adminRoutes.delete('/logout', adminController.logout.bind(adminController));

adminRoutes.use(adminAuthMiddleware.exec.bind(adminAuthMiddleware));

adminRoutes.post("/candidates/create",adminController.createUser.bind(adminController));
adminRoutes.delete("/candidates/:id",adminController.deleteUser.bind(adminController));
adminRoutes.get("/candidates",adminController.getUsers.bind(adminController));

export default adminRoutes;