import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { downloadPost } from "../controllers/download.controller.js";
const downloadRouter = Router();


downloadRouter.route('/download/:id').get(verifyToken,downloadPost)

export { downloadRouter };