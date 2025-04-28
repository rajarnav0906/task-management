# Task Management Website

This is a task management application where users can manage tasks, mark them as completed or active, and filter them based on their status. The platform consists of a frontend built with React and a backend built with Node.js and Express and database in MongoDB.

## Setup Instructions

### Frontend Setup (React)

git clone https://github.com/rajarnav0906/task-management.git
cd task-management/frontend

# Install dependencies: Install the necessary dependencies for the frontend using npm or yarn:

bash
npm install

# Start the frontend: After installing the dependencies, start the frontend development server:

bash
npm run dev

The application should be running at http://localhost:5173 by default.



### Backend Setup (Node.js + Express)


git clone https://github.com/rajarnav0906/task-management.git
cd task-management/backend

npm install

# contact me for .env file
PORT=8001
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_jwt_secret_key


npm start

The application should be running at http://localhost:8001 by default.



### Brief Explanation of Technical Choices and Architecture

## Frontend (React):
The frontend of the application is built using React, which provides a dynamic and responsive user interface.

React Router is used for routing to handle navigation between pages (e.g., Login, Task Dashboard, etc.).

Axios is used for making HTTP requests to the backend API.

Redux (with React-Redux) is used for state management, especially for handling user authentication and task data.

The app uses Framer Motion for smooth animations and transitions.

## Backend (Node.js + Express):
The backend is built using Node.js and Express for handling RESTful API routes.

MongoDB is used as the database, with Mongoose providing an ORM for schema definition and querying.

JWT (JSON Web Token) is used for user authentication.

bcryptjs is used for hashing passwords.

dotenv is used to manage environment variables (e.g., MongoDB connection string, JWT secret).

## Database Schema
The application uses MongoDB with Mongoose for data storage. The following schemas are used:

# User Schema:
email (String): The user's email address.

password (String): The user's hashed password.


# Task Schema:
title (String): The title of the task.

description (String): A detailed description of the task.

status (String): The status of the task, which can be 'active', 'completed', or 'pending'.

priority (String): The priority of the task, which can be 'high', 'medium', or 'low'.

createdAt (Date): The creation date of the task.

updatedAt (Date): The last updated date of the task.



### Seed data for testing

# User 1:
Email: testuser1@example.com

Password: testpassword1

# Tasks for User 1:
Task 1:

Title: Task 1

Description: Sample task description

Status: active

Priority: high

CreatedAt: (current date)

Task 2:

Title: Task 2

Description: Another sample task description

Status: completed

Priority: medium


# User 2:
Email: testuser2@example.com

Password: testpassword2

# Tasks for User 2:
Task 1:

Title: Task 3

Description: Sample task for testing

Status: pending

Priority: low

CreatedAt: (current date)

Task 2:

Title: Task 4

Description: Another sample task for testing

Status: active

Priority: medium
