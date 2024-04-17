import { ConnectionOptions } from "mysql2";
import { config } from "dotenv";

config();

export const databaseConfig: ConnectionOptions = {
    host: 'database-1.cd8ee2i0wc9v.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'multidiciplinario'
}