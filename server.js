import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routers/userRoute.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((erorr) => {
        console.error('Error connecting to MongoDB:', erorr.message)
    })