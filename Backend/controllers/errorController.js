const AppError = require('../utils/appError');

const handleCastErrorBB = (err) => {
  const message = ` Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  // const value = err.message.match(/"([^"]*)"/)[1];
  const value = err.keyValue;

  const message = `Duplicate field value:${
    Object.entries(value)[0]
  }. please use another value!`;
  return new AppError(message, 400);
};

const handleValidatonErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid inut data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid Token. please login again', 401);
};

const handleTokenExpire = () => {
  return new AppError('Your token has expired Please login again', 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProduction = (err, res) => {
  // Operational, trusted error:send message to the client
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  // Programming or other unknown error: don't leak to the client
  else {
    // 1) log the error
    console.error('ERROR 💥', err);
    // 2) send message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorBB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.name === 'ValidationError') error = handleValidatonErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleTokenExpire();

    sendErrorProduction(error, res);
  }
};
