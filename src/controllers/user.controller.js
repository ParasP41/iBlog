import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/APIError.js';
import { ApiResponse } from '../utils/APIResponce.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const options = {
    httpOnly: true,
    secure: true
}



const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const confirm_password=req.body;

    if (!firstName || !lastName || !userName || !email || !password || !confirm_password) {
        throw new ApiError(400, "REQUIRED FIELD IS MISSING ( firstName, lastName, username, email, password )");
    }

    if(confirm_password===password)
    {
        throw new ApiError(400,"IMVALID CRDENTIALS");
    }

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existingUser) {
        throw new ApiError(400, "USER ALREADY EXISTS");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword
    });

    const createdUser = await User.findById(user._id).select("-password");

    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    return res.status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(200, createdUser, "USER REGISTERED SUCCESSFULLY"));

});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "REQUIRED FIELD IS MISSING ( email, password )");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "INVALID EMAIL OR PASSWORD");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "INVALID EMAIL OR PASSWORD");
    }

    const loggedUser = await User.findById(user._id).select("-password");

    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    return res.status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(200, loggedUser, "USER REGISTERED SUCCESSFULLY"));


});


const logout = asyncHandler(async (req, res) => {
    const loggedOutUser = req.user;

    return res.status(200)
        .cookie("token", "", options)
        .json(
            new ApiResponse(
                200,
                { loggedOutUser },
                "USER LOGGED OUT SUCCESSFULLY"
            )
        );
});


``

export {
    registerUser, login, logout,
    
};