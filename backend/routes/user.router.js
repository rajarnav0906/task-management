import {Router} from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {authenticateToken} from "./userAuth.js";

const router = Router();

// sign-up
router.post("/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
      }
  
      // check email format (basic)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
  
      // check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists!" });
      }
  
      // check password length
      if (password.length < 6) {
        return res.status(400).json({ message: "Password should be at least 6 characters" });
      }
  
      // hash the password manually here
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // create new user with hashed password
      const newUser = new User({
        email,
        password: hashedPassword
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully!" });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

// log-in
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
      }
  
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "User not found!" });
      }
  
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
  
      const payload = {
        id: existingUser._id,
        email: existingUser.email
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d"
      });
  
      res.json({
        id: existingUser._id,
        email: existingUser.email,
        token: token
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});


export default router;
