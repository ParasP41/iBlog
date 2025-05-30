import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const Comment = mongoose.model("Comment", commentSchema);
