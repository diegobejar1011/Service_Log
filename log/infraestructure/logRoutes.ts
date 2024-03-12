import { createdLogController } from "./logDependencies";
import { Router } from "express";

export const logRouter = Router();

logRouter.post("/", createdLogController.execute.bind(createdLogController));

