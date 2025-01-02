import { Router } from "express";
import ErrorHandler from "../middlewares/ErrorHandler";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use('/admin',adminRoutes);
router.use(userRoutes);

router.use(new ErrorHandler().exec);

export default router