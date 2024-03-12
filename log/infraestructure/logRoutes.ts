import { createLogController, getLogController } from "./logDependencies";
import { Router } from "express";

export const logRouter = Router();

logRouter.post("/", createLogController.execute.bind(createLogController));
logRouter.get("/", getLogController.execute.bind(getLogController));

