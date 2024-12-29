import { Router } from "express";
import ErrorHandler from "../middlewares/ErrorHandler";

const router = Router();



router.use(new ErrorHandler().exec);

export default router