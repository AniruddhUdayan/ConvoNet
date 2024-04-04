import jwt from "jsonwebtoken";
import {ErrorHandler} from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token)
    return next(new ErrorHandler("Not authorized to access this route", 401));
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData.id;
  next();
};


const isAdmin = (req, res, next) => {
  const token = req.cookies["adminToken"];
  if (!token)
    return next(new ErrorHandler("Not authorized to access this route , admin only", 401));
  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  const adminKey = process.env.ADMIN_SECRET_KEY || 'admin123';

  const isMatched = secretKey === adminKey;

  if(!isMatched){
    return next(new ErrorHandler("Not authorized to access this route , admin only", 401));
  }

  next();
};

export { isAuthenticated , isAdmin };
