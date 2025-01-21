/* eslint-disable no-undef */
const express = require('express');

const morgan = require('morgan');
const plantRouter = require('./routes/plantRoutes');

const app = express();

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use('/api/plants', plantRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

// const userRouter = express.Router();
// app.use('/api/user', userRouter);

module.exports = app;
