const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
require('dotenv').config();

// Verifies the JWT token from cookie or header
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null);

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // Store user id in req.user
  req.user = {
    id: decodedData.id
  };

  next();
});
