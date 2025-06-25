/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

const morgan = require('morgan');
const plantRouter = require('./routes/plantRoutes');
const userRouter = require('./routes/userRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const orderRouter = require('./routes/orderRoutes');
const imageRouter = require('./routes/imageRoutes');
const AppError = require('./utils/appError');
const contactRoutes = require('./routes/contactRoutes');
const globalErrorHandler = require('./controllers/errorController');
const faqRouter = require('./routes/faqRoutes');

const app = express();

// ✅ CORRECT CORS SETUP
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // 👈 Preflight for ALL routes

// ✅ JSON Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/plants', plantRouter);
app.use('/api/users', userRouter);
app.use('/api/payment', paymentRouter);
app.use('/images', imageRouter);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/faqs', faqRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// const userRouter = express.Router();
// app.use('/api/user', userRouter);

module.exports = app;
