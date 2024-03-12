import { LogReq, LogRes } from "../entities";

export interface DatabaseRepository {
    create(log: LogReq): Promise<LogRes>;
    get(): Promise<LogRes[]>;
}