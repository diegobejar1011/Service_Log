import { db } from "../../../shared/application/mysqlConn";
import { LogReq, LogRes, Log} from "../../domain/entities";
import { DatabaseRepository } from "../../domain/repositories/DatabaseRepository";

export class MySQLRepository implements DatabaseRepository {
    async create(log: Log): Promise<number> {
        try {
            const { id_habitat, temperature, noteTemperature, humidity, noteHumidity, movement, note, record_at } = log;
            const query = 'INSERT INTO logs (id_habitat, temperature, noteTemperature, humidity, noteHumidity, movement, note, record_at)  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)';
            const result : any = await db.execute(query, [id_habitat, temperature, noteTemperature, humidity, noteHumidity, movement, note, record_at]);
            return result[0].insertId;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    async get(): Promise<LogRes[]> {
        try {
            const query = 'SELECT id, id_habitat, noteTemperature, noteHumidity, movement, note, record_at FROM logs ORDER BY record_at DESC';
            const [rows] : any = await db.execute(query);
            return rows;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    async getParams(id: number): Promise<Log> {
        try {
            const query = 'SELECT id, temperature, humidity, interval_review FROM habitats WHERE id = ?';
            const [row] : any = await db.execute(query,[id]);
            return row[0];
        } catch (error : any) {
            throw new Error(error);
        }
    }

    async getLastLog(): Promise<LogRes> {
        try {
            const query = 'SELECT id, id_habitat, record_at FROM logs ORDER BY created_at DESC LIMIT 1';
            const [row] : any = await db.execute(query);
            return row[0];
        } catch (error : any) {
            throw new Error(error);
        }
    }
}