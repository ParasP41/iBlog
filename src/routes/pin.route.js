import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
const pinRouter = Router();


pinRouter.route('/').post(verifyToken)

export { pinRouter };