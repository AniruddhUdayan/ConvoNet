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

export { isAuthenticated };
