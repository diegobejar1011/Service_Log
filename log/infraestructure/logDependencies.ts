import { MySQLRepository } from "./ports/MySQLRepository";
import { AMQPLIBRepository } from "../../broker/infraestructure/amqplibRepository";

import { SendMessageService } from "../../broker/application/SendMessage";

import { CreateLogService } from "../application/services/CreateLogService";
import { GetLogService } from "../application/services/GetLogService";

import { ValidateDateService } from "../application/services/ValidateDateService";

import { CreateLogController } from "./controllers/CreateLogController";
import { GetLogController } from "./controllers/GetLogController";

const mysqlRepository = new MySQLRepository();
const ampqlibRepository = new AMQPLIBRepository('amqp://18.209.192.241/');

const sendMessageService = new SendMessageService(ampqlibRepository);

const createLogService = new CreateLogService(mysqlRepository, sendMessageService);
const getLogService = new GetLogService(mysqlRepository);

const validateDateService = new ValidateDateService(mysqlRepository);

export const createLogController = new CreateLogController(createLogService, validateDateService);
export const getLogController = new GetLogController(getLogService);


