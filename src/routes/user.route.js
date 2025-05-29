import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
const router = Router();

//Auth routes
router.route('/signup').post(registerUser);
router.route('/login').post(login)

export default router;