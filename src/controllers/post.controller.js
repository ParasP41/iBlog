import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/APIError.js';
import { ApiResponse } from '../utils/APIResponce.js'
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

const postblog = asyncHandler(async (req, res) => {
    const { title, category, excerpt, content } = req.body;

    if (!title || !category || !excerpt || !content) {
        throw new ApiError(401, "REQUIRED FIELD IS MISSING ( title, category, excerpt, content )");
    }

    const currentLoggedInUser = req.user;

    // Create new post
    const post = await Post.create({
        title,
        category,
        excerpt,
        content,
        userId: currentLoggedInUser._id
    });

    // Update user by pushing post ID into their postId array
    await User.findByIdAndUpdate(
        currentLoggedInUser._id,
        {
            $push: { postId: post._id }
        },
        { new: true }
    );

    // Send success response
    res.status(200).json(
        new ApiResponse(200, post, "BLOG HAS BEEN POSTED SUCCESSFULLY")
    );
});

const updateblog = asyncHandler(async (req, res) => {
    const { title, category, excerpt, content } = req.body;
    const id = req.params.id;
    const currentLoggedInUser = req.user;

    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "POST NOT FOUND");
    }

    const user = await User.findById(currentLoggedInUser._id);
    if (!user) {
        throw new ApiError(404, "USER NOT FOUND");
    }

    if (!post.userId.equals(user._id)) {
        throw new ApiError(403, "POST DOES NOT BELONG TO THE LOGGED-IN USER");
    }

    const updatePost = await Post.findByIdAndUpdate(
        id,
        { title, category, excerpt, content },
        { new: true }
    );

    if (!updatePost) {
        throw new ApiError(500, "FAILED TO UPDATE POST");
    }

    return res.status(200).json(
        new ApiResponse(200, updatePost, "BLOG HAS BEEN UPDATED SUCCESSFULLY")
    );
});

const deleteBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const currentLoggedInUser = req.user;

    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "POST NOT FOUND");
    }

    const user = await User.findById(currentLoggedInUser._id);
    if (!user) {
        throw new ApiError(404, "USER NOT FOUND");
    }

    if (!post.userId.equals(user._id)) {
        throw new ApiError(403, "POST DOES NOT BELONG TO THE LOGGED-IN USER");
    }

    // Remove the post ID from the user's postId array
    await User.findByIdAndUpdate(
        user._id,
        {
            $pull: {
                postId: post._id,
            }
        },
        { new: true }
    );

    // Delete the post from the Post collection
    await Post.findByIdAndDelete(post._id);

    return res.status(200).json(
        new ApiResponse(200, null, "POST DELETED AND REMOVED FROM USER SUCCESSFULLY")
    );
});

export { postblog, updateblog, deleteBlog }