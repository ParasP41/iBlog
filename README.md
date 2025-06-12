
# 📘 iBlog - Backend

**iBlog** is a simple and efficient blog application backend built with **Express.js**. It provides RESTful APIs for creating, reading, updating, and deleting blog posts. This backend is designed to be scalable, clean, and easy to integrate with any frontend.

## 🚀 Features

- User authentication and authorization  
- CRUD operations for blog posts  
- MongoDB integration for persistent storage  
- Input validation and error handling  
- Secure routes with JWT  
- CORS enabled for frontend communication  

## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** with Mongoose  
- **JWT** for authentication  
- **bcrypt.js** for password hashing  
- **dotenv** for environment variable management  
- **CORS**, **Helmet**, and **Morgan** for security and logging

## 📂 Folder Structure

```
iBlog-backend/
├── public/
│   └── temp
├── src/
│   ├── controllers/
│   │   └── comment.controller.js
│   │   └── download.controller.js
│   │   └── like.controller.js
│   │   └── pin.controller.js
│   │   └── post.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── index.js
│   ├── middleware/
│   │   └── multer.middleware.js
│   │   └── verifyToken.middleware.js
│   ├── models/
│   │   └── comment.model.js
│   │   └── post.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   └── comment.route.js
│   │   └── download.route.js
│   │   └── like.route.js
│   │   └── pin.route.js
│   │   └── post.route.js
│   │   └── user.route.js
│   ├── utils/
│   │   └── APIError.js
│   │   └── APIResponce.js
│   │   └── asyncHandler.js
│   │   └── cloudinary.js
├── .env
├── app.js
├── index.js
├── .gitignore.js
├── .prettierignore.js
├── .prettierrc.js
├── package-lock.json
├── package.json
└── README.MD
```


## 🧪 Running Locally

```bash
git clone https://github.com/yourusername/iBlog-backend.git
cd iBlog-backend
npm install
npm run dev
```

