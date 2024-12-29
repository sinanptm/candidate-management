import express from 'express';
import { CLIENT_URL, PORT } from './config/env';
import connectDB from './config/connectDB';
import cors from 'cors';
import router from './presentation/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


app.use("/api", router);

app.listen(PORT, () => {
    connectDB();
    console.log('server start listening on ', PORT);
});