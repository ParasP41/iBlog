import { ApiError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new ApiError(4001, "UNAUTHORISED REQUEST : NO TOKEN PROVIDED")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
        throw new ApiError(401, "INVALID ACCESS TOKEN");
    }

    req.user = user;
    next();


})
export { verifyToken }