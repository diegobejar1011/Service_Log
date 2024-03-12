import { ConnectionOptions } from "mysql2";
import { config } from "dotenv";

config();

export const databaseConfig: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}