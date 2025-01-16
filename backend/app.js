const express = require('express');
const dotenv = require('dotenv');
const { connectSqlDB } = require('./database/mysql');
const authRoutes = require('./routes/auth');
const cors = require('cors');


dotenv.config();
connectSqlDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;
