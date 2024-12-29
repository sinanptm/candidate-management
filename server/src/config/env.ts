import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const NODE_ENV = process.env.NODE_ENV || "DEV";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
export const MONGO_URI = process.env.MONGO_URI!;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1111';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret_texts";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ||"Accesstoken_secret"