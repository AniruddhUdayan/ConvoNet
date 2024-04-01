import express from 'express';
import { connectDB } from './utils/features.js';
import dotenv from 'dotenv';
import { errorMiddleWare } from './middlewares/error.js';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import { createUsers } from './seeders/user.js';

dotenv.config({
    path:'./.env'
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);
// createUsers(10);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoute);
app.use('/chat', chatRoute);


app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});