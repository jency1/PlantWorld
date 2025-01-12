/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const plantRouter = require('./routes/plantRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/plants', plantRouter);

// const userRouter = express.Router();
// app.use('/api/user', userRouter);

module.exports = app;
