import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { pinPost } from "../controllers/pin.controller.js";
const pinRouter = Router();


pinRouter.route('/pin/:id').post(verifyToken,pinPost)

export { pinRouter };