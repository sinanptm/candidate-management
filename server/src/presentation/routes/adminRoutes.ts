import { Router } from "express";
import AuthAdminUseCase from "../../use_case/admin/AuthAdminUseCase";
import UserRepository from "../../infrastructure/repository/UserRepository";
import TokenService from "../../infrastructure/service/TokenService";
import AdminController from "../controllers/AdminController";

const adminRoutes = Router();

const userRepository = new UserRepository();
const tokenService = new TokenService();

const authAdminUseCase = new AuthAdminUseCase(
    userRepository,
    tokenService
);
const adminController = new AdminController(authAdminUseCase)


adminRoutes.post("/login", adminController.login.bind(adminController))


export default adminRoutes;