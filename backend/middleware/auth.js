const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const {token}  = req.cookies; //taking token from cookies

 // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  //verifying token with secret key 
  const data = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(data.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
