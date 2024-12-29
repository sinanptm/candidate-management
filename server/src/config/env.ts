import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGOURI = process.env.MONGOURI || "mongodb://localhost:27017/CMANAGE"