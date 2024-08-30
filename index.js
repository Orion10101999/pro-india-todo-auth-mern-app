import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './server/config/connectDB.js';
import router from './server/routes/index.js';
import todoRouter from './server/routes/todo.route.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World !' + ' server running at ' + PORT);
});

// api endpoints
app.use('/api', router);
app.use('/api/todo', todoRouter);

connectDB().then(() => {
    console.log('mongodb atlas connected');

    app.listen(PORT, () => {
        console.log('server running at ' + PORT);
    });
}).catch((err) => {
    console.log('mongodb atlas connection failed');
});
