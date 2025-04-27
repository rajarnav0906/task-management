import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './connection/db.js';
import userRoutes from "./routes/user.router.js";
import taskRoutes from "./routes/task.router.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;

// database configuration
connectDB();


// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})