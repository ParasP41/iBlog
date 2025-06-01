import { Router } from "express";
import { postblog, updateblog, deleteBlog, allPostedBlog, findUserPostedblog } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { upload } from '../middleware/multer.middleware.js'

const postRouter = Router();

//Post routes
postRouter.route('/postblog').post(verifyToken, upload.single("image"), postblog)
postRouter.route('/postedit/:id').put(verifyToken, upload.single("image"), updateblog)
postRouter.route('/postdelete/:id').delete(verifyToken, deleteBlog)
postRouter.route('/allpost').get(verifyToken, allPostedBlog)
postRouter.route('/allUserpost').get(verifyToken, findUserPostedblog)


export { postRouter };