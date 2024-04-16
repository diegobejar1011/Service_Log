import { createLogController, getLogController } from "./logDependencies";
import { Router } from "express";

import { veriifyToken } from "../../auth/infraestructure/authDependencies";

export const logRouter = Router();

logRouter.post("/", createLogController.execute.bind(createLogController));
logRouter.get("/", veriifyToken.execute.bind(veriifyToken), getLogController.execute.bind(getLogController));

 