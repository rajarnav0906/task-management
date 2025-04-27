import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Get Bearer token 

    if (!token) {
      return res.status(401).json({ message: "Token not provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded JWT:", decoded);

    // Find user in DB to attach full user data
    const user = await User.findById(decoded.id).select("-password");
    // console.log("user", user); // remove password from response
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user; // attach full user object to request
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token. Please log in again." });
  }
};
