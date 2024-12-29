import express from 'express';
import { PORT } from './config/env';
import connectDB from './config/connectDB';

const app = express();


app.listen(PORT, () => {
    connectDB()
    console.log('server start listening on ', PORT);
});