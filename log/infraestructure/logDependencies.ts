import { MySQLRepository } from "./ports/MySQLRepository";
import { AMQPLIBRepository } from "../../broker/infraestructure/amqplibRepository";

import { SendMessageService } from "../../broker/application/SendMessage";

import { CreateLogService } from "../application/services/CreateLogService";
import { GetLogService } from "../application/services/GetLogService";

import { CreateLogController } from "./controllers/CreateLogController";
import { GetLogController } from "./controllers/GetLogController";

const mysqlRepository = new MySQLRepository();
const ampqlibRepository = new AMQPLIBRepository('...');

const sendMessageService = new SendMessageService(ampqlibRepository);

const createLogService = new CreateLogService(mysqlRepository, sendMessageService);
const getLogService = new GetLogService(mysqlRepository);

export const createLogController = new CreateLogController(createLogService);
export const getLogController = new GetLogController(getLogService);


