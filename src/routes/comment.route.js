import { Router } from 'express';
import { addComment, deletePostComment, editPostComment, findAllPostComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const commentRouter = Router();

commentRouter.route('/comment/:id').post(verifyToken,addComment);
commentRouter.route('/allPostComment/:id').get(verifyToken,findAllPostComment);
commentRouter.route('/editPostComment/:commentId/:postId').put(verifyToken,editPostComment);
commentRouter.route('/deletePostComment/:commentId/:postId').delete(verifyToken,deletePostComment);


export { commentRouter };
