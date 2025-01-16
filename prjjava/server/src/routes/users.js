import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });

  }

});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user){
    return res.json({message:"User doesn't exist!"});
  }
  else {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      return res.json({message:"Username or Password is incorrect"});
    }
    
    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});
  
  }
  


});

router.post("/updateScore", async (req, res) => {
  const { userId, scoreToAdd } = req.body;
  try {
      const user = await UserModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      user.score += scoreToAdd;
      await user.save();
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: "Error updating score", error });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
      const users = await UserModel.find({}, { username: 1, score: 1, _id: 0 }); // Query all users and select only username and score fields
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});
    
export { router as userRouter};