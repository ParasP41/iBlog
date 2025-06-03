import { Router } from "express";
import { login, logout, registerUser, updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { upload } from '../middleware/multer.middleware.js'
const userRouter = Router();



//Auth routes
userRouter.route('/signup').post(registerUser);
userRouter.route('/login').post(login)
userRouter.route('/logout').post(verifyToken, logout)
userRouter.route('/updateprofile').post(verifyToken, upload.single("picture"), updateProfile)


export { userRouter };