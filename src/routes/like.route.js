import { Router } from "express";
import { likePost } from "../controllers/like.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
const likeRouter = Router();


likeRouter.route('/like/:id').post(verifyToken,likePost)


export { likeRouter };