import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/APIError.js';
import { ApiResponse } from '../utils/APIResponce.js'
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

const likePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(401, "UNABLE TO FIND THE POST");
    }

    const alreadyLiked = post.likes.includes(userId.toString());

    if (alreadyLiked) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json(new ApiResponse(200, {
        totalLikes: post.likes.length,
        liked: !alreadyLiked,
    }, alreadyLiked ? "Post unliked" : "Post liked"));

})

export { likePost }