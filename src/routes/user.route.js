import { Router } from "express";
import { index, logout, registerUser } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
const router = Router();


router.route('/').get(index);


//Auth routes
router.route('/signup').post(registerUser);
router.route('/login').post(login)
router.route('/logout').post(verifyToken,logout)


export default router;