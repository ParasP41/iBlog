import { Router } from "express";
import { postblog, updateblog } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { deleteBlog } from "../controllers/post.controller.js";

const router = Router();

//Post routes
router.route('/postblog').post(verifyToken,postblog)
router.route('/postedit/:id').put(verifyToken,updateblog)
router.route('/postdelete/:id').delete(verifyToken,deleteBlog)


export default router;