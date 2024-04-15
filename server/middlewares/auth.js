import jwt from "jsonwebtoken";
import {ErrorHandler} from "../utils/utility.js";
import {User} from "../models/user.js";
import {TOKEN} from "../constants/config.js";

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


const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[TOKEN];
    // console.log("authToken", authToken);

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
// console.log("decodedData", decodedData);
    const user = await User.findById(decodedData.id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};


export { isAuthenticated , isAdmin , socketAuthenticator };
