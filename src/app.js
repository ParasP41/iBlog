import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



//Auth Routes
import { userRouter } from './routes/user.route.js'
app.use('/api/v1/users', userRouter)


//Post Routes
import { postRouter } from './routes/post.route.js'
app.use('/api/v1/users', postRouter)

//Comment Routes
import { commentRouter } from './routes/comment.route.js';
app.use('/api/v1/users', commentRouter);

//Like Routes
import { likeRouter } from './routes/like.route.js';
app.use('/api/v1/users', likeRouter);

//Pins Routes
import { pinRouter } from './routes/pin.route.js';
app.use('/api/v1/users', pinRouter);

//Download Routes
import { downloadRouter } from './routes/download.route.js';
app.use('/api/v1/users', downloadRouter);



export { app };