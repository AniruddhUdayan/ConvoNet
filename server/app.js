import express from 'express';
import userRoute from './routes/user.js';
import { connectDB } from './utils/features.js';
import dotenv from 'dotenv';
import { errorMiddleWare } from './middlewares/error.js';
import { getMyProfile } from './controllers/user.js';
import { isAuthenticated } from './middlewares/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config({
    path:'./.env'
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoute);

// app.get('/', isAuthenticated ,getMyProfile);

app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});