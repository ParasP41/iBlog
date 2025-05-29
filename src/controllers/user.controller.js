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
    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (!firstName || !lastName || !userName || !email || !password) {
        throw new ApiError(400, "REQUIRED FIELD IS MISSING ( firstName, lastName, username, email, password )")
    }

    if (existingUser) {
        throw new ApiError(400, "USER ALREADY EXIST");
    }

    bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = await User.create({
                firstName,
                lastName,
                userName,
                email,
                password: hash
            })


            const createdUser = await User.findById(user._id).select("-password");
            let token = jwt.sign({
                _id: user._id,
                email: user.email,
                username: user.userName,
            },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
            )

            return res.status(200)
                .cookie("token", token, options)
                .json(new ApiResponse(200, createdUser, "USER LOGGEDIN SUCCESSFULLY"));
        });

    });

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "REQUIRED FIELD IS MISSING ( email, password )")
    }

    bcrypt.hash(password, 10,async function (err, hash) {
        const user = await User.findOne({
            $and:[{email},{hash}]
        })
        res.send(user);
        console.log(user)
    });
})

export { registerUser, login }