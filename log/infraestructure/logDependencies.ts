import { MySQLRepository } from "./ports/MySQLRepository";

import { CreateLogService } from "../application/services/CreateLogService";

import { CreateLogController } from "./controllers/CreateLogController";

const mysqlRepository = new MySQLRepository();

const createLogService = new CreateLogService(mysqlRepository);

export const createdLogController = new CreateLogController(createLogService);


