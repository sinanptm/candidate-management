import { Router } from "express";
import AuthAdminUseCase from "../../use_case/admin/AuthAdminUseCase";
import UserRepository from "../../infrastructure/repository/UserRepository";
import TokenService from "../../infrastructure/service/TokenService";
import AdminController from "../controllers/AdminController";
import AdminAuthMiddleWare from "../middlewares/AdminAuthMiddleware";

const adminRoutes = Router();

const userRepository = new UserRepository();
const tokenService = new TokenService();

const authAdminUseCase = new AuthAdminUseCase(
    userRepository,
    tokenService
);
const adminController = new AdminController(authAdminUseCase);
const adminAuthMiddleware = new AdminAuthMiddleWare(tokenService);


adminRoutes.post("/login", adminController.login.bind(adminController));
adminRoutes.delete('/logout', adminController.logout.bind(adminController));

adminRoutes.use(adminAuthMiddleware.exec.bind(adminAuthMiddleware));

export default adminRoutes;