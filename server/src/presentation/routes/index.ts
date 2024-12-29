import { Router } from "express";
import ErrorHandler from "../middlewares/ErrorHandler";
import adminRoutes from "./adminRoutes";

const router = Router();

router.use('/admin',adminRoutes)

router.use(new ErrorHandler().exec);

export default router