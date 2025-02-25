const express = require('express');
const dotenv = require('dotenv');
const { connectSqlDB } = require('./database/mysql');
const authRoutes = require('./routes/auth');
const fieldRoutes = require('./routes/fields')
const formRoutes = require('./routes/form')
const formSubmitRoutes = require('./routes/formSubmit')
const cors = require('cors');


dotenv.config();
connectSqlDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/form', formRoutes);
app.use('/api/submitForm', formSubmitRoutes);


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
