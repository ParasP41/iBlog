import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/APIError.js';
import { ApiResponse } from '../utils/APIResponce.js'
import { User } from '../models/user.model.js';

const pinPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const alreadyPinned = user.pins.includes(postId.toString());

    if (alreadyPinned) {
        user.pins.pull(postId); // unpin
    } else {
        user.pins.push(postId); // pin
    }

    await user.save();

    return res.status(200).json(new ApiResponse(
        200,
        {
            pinnedPosts: user.pins,
            pinned: !alreadyPinned,
        },
        alreadyPinned ? "Post unpinned" : "Post pinned"
    ));
});


export { pinPost }