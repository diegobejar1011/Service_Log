import { db } from "../../../shared/application/mysqlConn";
import { LogReq, LogRes, Log} from "../../domain/entities";
import { DatabaseRepository } from "../../domain/repositories/DatabaseRepository";

export class MySQLRepository implements DatabaseRepository {
    async create(log: Log): Promise<void> {
        try {
            const { id_habitat, temperature, noteTemperature, humidity, noteHumidity, movement, note } = log;
            const query = 'INSERT INTO log (id, id_habitat, temperature, noteTemperature, humidity, noteHumidity, movement, note)  VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)';
            await db.execute(query, [id_habitat, temperature, noteTemperature, humidity, noteHumidity, movement, note]);
        } catch (error : any) {
            throw new Error(error)
        }
    }

    async get(): Promise<LogRes[]> {
        try {
            const query = 'SELECT id_habitat, noteTemperature, noteHumidity, movement, note FROM log';
            const [rows] : any = await db.execute(query);
            return rows;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    async getParams(id: string): Promise<LogReq> {
        try {
            const query = 'SELECT id, temperature, humidity, movement FROM habitat WHERE id = ?';
            const [row] : any = await db.execute(query,[id]);
            return row[0];
        } catch (error : any) {
            throw new Error(error);
        }
    }
}