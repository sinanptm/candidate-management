import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const NODE_ENV = process.env.NODE_ENV || "DEV";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
export const MONGO_URI = process.env.MONGO_URI!;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "muhammedsinan0549@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'fjfj';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret_texts";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ||"accesstoken_secret"
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;