import { LogReq, LogRes} from "../entities";

export interface DatabaseRepository {
    create(log: LogRes): Promise<void>;
    get(): Promise<LogRes[]>;
    getParams(id: string): Promise<LogReq>;
}