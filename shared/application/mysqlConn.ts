import { createConnection } from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { databaseConfig } from "../domain/mysqlConfig";

const conn : Connection = createConnection(databaseConfig);

export const db = conn.promise();