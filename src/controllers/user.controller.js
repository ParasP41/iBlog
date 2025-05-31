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


const indexPage=asyncHandler(async(req,res)=>
{
    res.render('index');
})

const aboutPage=asyncHandler(async(req,res)=>
{
    res.render('about');
})
const contactPage=asyncHandler(async(req,res)=>
{
    res.render('contact');
})

const homePage=asyncHandler(async(req,res)=>
{
    res.render('home');
})

const dashboardPage=asyncHandler(async(req,res)=>
{
    res.render('dashboard');
})

const categoryPage=asyncHandler(async(req,res)=>
{
    res.render('category', {
  category: 'all',
  startIndex: 0,
  endIndex: 9,
  sortedPosts: [], // or actual posts array
  sortBy: 'latest',
  currentPosts: [], // or actual current posts array
  totalPages: 1,
  currentPage: 1
});
})



const blogPostPage = asyncHandler(async (req, res) => {
    res.render('tabs/createpost');
})
const loginPage = asyncHandler(async (req, res) => {
    res.render('login');
})

const signUpPage = asyncHandler(async (req, res) => {
    res.render('signup');
})




const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
        throw new ApiError(400, "REQUIRED FIELD IS MISSING ( firstName, lastName, username, email, password )");
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


export {
    registerUser, login, logout,
    indexPage, loginPage, signUpPage,aboutPage,contactPage,categoryPage,homePage,dashboardPage,blogPostPage
};