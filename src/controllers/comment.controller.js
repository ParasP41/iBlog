import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/APIError.js';
import { ApiResponse } from '../utils/APIResponce.js'
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js'

const addComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const postId = req.params.id;
    const currentUser = req.user;

    if (!comment || comment.trim() === "") {
        throw new ApiError(400, "COMMENT IS REQUIRED");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "POST NOT FOUND");
    }

    const newComment = await Comment.create({
        userId: currentUser._id,
        username: currentUser.userName,
        postId: post._id,
        comment: comment.trim(),
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            newComment,
            "COMMENT GENERATED SUCCESSFULLY"
        )
    );
});


const findAllPostComment = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const comments = await Comment.find({ postId });

    if (comments.length === 0) {
        throw new ApiError(404, "No comments found for this post");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            comments,
            "Fetched all comments for the post"
        )
    );
});


const editPostComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const { commentId, postId } = req.params;
    const currentUser = req.user;

    if (!comment || comment.trim() === "") {
        throw new ApiError(400, "COMMENT IS REQUIRED");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "POST NOT FOUND");
    }
    const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, userId: currentUser._id, postId: post._id },
        { comment: comment.trim() },
        { new: true }
    );

    if (!updatedComment) {
        throw new ApiError(404, "Comment not found or you're not authorized to update it");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedComment,
            "COMMENT UPDATED SUCCESSFULLY"
        )
    );
});

const deletePostComment = asyncHandler(async (req, res) => {
    const { commentId, postId } = req.params;
    const currentUser = req.user;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "POST NOT FOUND");
    }

    const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        userId: currentUser._id,
        postId: post._id,
    });

    if (!deletedComment) {
        throw new ApiError(404, "Comment not found or you're not authorized to delete it");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            [],
            "COMMENT DELETED SUCCESSFULLY"
        )
    );
});



export { addComment, findAllPostComment, editPostComment, deletePostComment }