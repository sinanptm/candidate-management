import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const NODE_ENV = process.env.NODE_ENV || "DEV";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
export const MONGO_URI = process.env.MONGO_URI!;
export const ADMIN_MAIL = process.env.ADMIN_MAIL || "admin@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1111';