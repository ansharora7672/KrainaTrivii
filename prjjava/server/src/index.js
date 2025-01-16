import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {userRouter} from './routes/users.js';
import quizRouter from './routes/quizes.js';

const app = express(); 
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/quizzes", quizRouter);

mongoose.connect("mongodb+srv://systemdesignproject:AAAM@krainatriviidb.92dthtl.mongodb.net/krainatriviiDB?retryWrites=true&w=majority&appName=krainatriviiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3004; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
