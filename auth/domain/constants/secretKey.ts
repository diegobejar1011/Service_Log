import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '1234';