import { Router } from "express";
import { postblog, updateblog, deleteBlog, allPostedBlog, findUserPostedblog } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { upload } from '../middleware/multer.middleware.js'

const router = Router();

//Post routes
router.route('/postblog').post(verifyToken, upload.single("image"), postblog)
router.route('/postedit/:id').put(verifyToken, upload.single("image"), updateblog)
router.route('/postdelete/:id').delete(verifyToken, deleteBlog)
router.route('/allpost').get(verifyToken, allPostedBlog)
router.route('/allUserpost').get(verifyToken, findUserPostedblog)



export default router;