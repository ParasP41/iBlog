import dotenv from 'dotenv';
import { connectDB } from './db/index.js'
import { application } from 'express';
import { app } from './app.js';
dotenv.config({
    path: "./env",
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 800, () => {
            console.log(`Server is Runnning at PORT ${process.env.PORT}`);
        })
    })
    .catch((error) => {
         console.log('MONGO DB connection failed !! ', error)
    })