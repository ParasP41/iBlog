import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
const userRouter = Router();



//Auth routes
userRouter.route('/signup').post(registerUser);
userRouter.route('/login').post(login)
userRouter.route('/logout').post(verifyToken, logout)


export { userRouter };