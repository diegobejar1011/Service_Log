import { MySQLRepository } from "./ports/MySQLRepository";

import { CreateLogService } from "../application/services/CreateLogService";
import { GetLogService } from "../application/services/GetLogService";

import { CreateLogController } from "./controllers/CreateLogController";
import { GetLogController } from "./controllers/GetLogController";

const mysqlRepository = new MySQLRepository();

const createLogService = new CreateLogService(mysqlRepository);
const getLogService = new GetLogService(mysqlRepository);

export const createLogController = new CreateLogController(createLogService);
export const getLogController = new GetLogController(getLogService);


