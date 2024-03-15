import { LogReq, LogRes, Log} from "../entities";

export interface DatabaseRepository {
    create(log: Log): Promise<void>;
    get(): Promise<LogRes[]>;
    getParams(id: string): Promise<LogReq>;
}