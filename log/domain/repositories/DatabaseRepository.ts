import { LogRes, Log} from "../entities";

export interface DatabaseRepository {
    create(log: Log): Promise<number>;
    get(): Promise<LogRes[]>;
    getParams(id: number): Promise<any>;
    getLastLog(): Promise<LogRes>;
}