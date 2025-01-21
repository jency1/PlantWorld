/* eslint-disable no-undef */
const express = require('express');

const morgan = require('morgan');
const plantRouter = require('./routes/plantRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use('/api/plants', plantRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// const userRouter = express.Router();
// app.use('/api/user', userRouter);

module.exports = app;
