/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

const morgan = require('morgan');
const plantRouter = require('./routes/plantRoutes');
const userRouter = require('./routes/userRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const imageRouter = require('./routes/imageRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/plants', plantRouter);
app.use('/api/users', userRouter);
app.use('/api/payment', paymentRouter);
app.use('/images', imageRouter);

app.get('/api/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// const userRouter = express.Router();
// app.use('/api/user', userRouter);

module.exports = app;
