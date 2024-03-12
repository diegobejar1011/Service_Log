import { logRouter } from "../../log/infraestructure/logRoutes";
import { Router } from "express";

export const indexRouter = Router();

indexRouter.use("/logs", logRouter);