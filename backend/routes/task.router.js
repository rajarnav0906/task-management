import { Router } from "express";
import Task from "../models/task.model.js";
import { authenticateToken } from "./userAuth.js";

const router = Router();

// Create Task
router.post("/add-task", authenticateToken, async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    
    // Check if all required fields are provided
    if (!title || !description || !status || !priority) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create new task and associate it with the authenticated user
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      userId: req.user.id  // This comes from the authenticated user
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all Tasks for the authenticated user
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Task Status
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Ensure that the task belongs to the authenticated user
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    // Toggle task status between "completed" and "active"
    if (req.body.status) {
      task.status = req.body.status === 'completed' ? 'completed' : 'active';
    }

    // Update priority if provided
    if (req.body.priority) {
      task.priority = req.body.priority;
    }

    const updatedTask = await task.save();
    
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Delete Task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Ensure that the task belongs to the authenticated user
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Task Stats for the authenticated user
router.get("/get-task-stats", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    // Calculate stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    const pendingTasks = tasks.filter(task => task.status === "active").length; // Change "pending" to "active"
    const highPriorityTasks = tasks.filter(task => task.priority === "high").length;

    const stats = {
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});




export default router;
