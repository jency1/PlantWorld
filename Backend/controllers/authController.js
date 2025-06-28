const catchAsync = require('../utils/catchAsync');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const { promisify } = require('util');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Convert Mongoose document to plain object (if it's not already)
  const userObj = user.toObject ? user.toObject() : { ...user };

  // Remove password
  delete userObj.password;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userObj,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log('Received data:', req.body);

  const { name, email, password, passwordConfirm, phoneNumber } = req.body;

  if (!name || !email || !password || !passwordConfirm || !phoneNumber) {
    return next(new AppError('All fields are required', 400));
  }

  const newUser = await User.create({
    name,
    email,
    phoneNumber: phoneNumber,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //   1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  //   2) check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //   3) If everything ok, send token to the client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1)Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in to get access', 401));
  }

  // 2) Verfication token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exist', 401)
    );
  }

  // 4) check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password! Please log in again')
    );

  req.user = currentUser;
  // Grant access to the protected route
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permissions to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1)Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  // 2) generate the random rest token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3)send it to user's email

  // Use request origin for frontend reset URL
  const origin = req.headers.origin || process.env.FRONTEND_URL;
  const resetURL = `${origin}/resetPassword/${resetToken}`;

  const message = `
  <p>Forgot your password?</p>
  <p>Click the button below to reset it:</p>
  <a 
    href="${resetURL}" 
    style="padding:10px 20px; color:green; text-decoration:underline; border-radius:5px; font-weight:bold;"
  >
    Reset Password
  </a>
  <p>If you didn't request a password reset, you can safely ignore this email.</p>
`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password reset Token (valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1)Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2)If token has not expired , and there is user , set the new password

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save({ validateBeforeSave: false });

  // 3)Update the changedPasswordAt property for the user

  // 4)Log the user in , send JWT
  createSendToken(user, 201, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1)Get user from the collection
  const user = await User.findById(req.user.id).select('+password');

  // 2)check if POSTed current password is correct
  if (!user.correctPassword(req.body.passwordConfirm, user.password)) {
    return next(new AppError('Youre current password is wrong', 401));
  }
  // 3)If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4)log user in , send JWT
  createSendToken(user, 200, res);
});
