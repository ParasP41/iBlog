import { Router } from "express";
import { indexPage, login, logout, registerUser, signUpPage,aboutPage, contactPage, categoryPage, homePage, dashboardPage, blogPostPage } from "../controllers/user.controller.js";
import { loginPage } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
const router = Router();

router.route('/').get(indexPage)
router.route('/login').get(loginPage);
router.route('/signup').get(signUpPage);
router.route('/about').get(aboutPage);
router.route('/contact').get(contactPage);
router.route('/category/all').get(categoryPage);
router.route('/home').get(homePage);
router.route('/dashboard').get(dashboardPage);
router.route('/create/post').get(blogPostPage);


//Auth routes
router.route('/signup').post(registerUser);
router.route('/login').post(login)
router.route('/logout').post(verifyToken,logout)


export default router;