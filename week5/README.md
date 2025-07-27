# Week 5 - Todo Application

A full-stack todo application with React frontend and Express.js backend.

## Project Structure

```
week5/
├── frontend/          # React application (Vite)
│   ├── src/          # React components and logic
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/           # Express.js server
│   ├── index.js      # Main server file
│   ├── db.js         # Database configuration
│   ├── types.js      # Zod validation schemas
│   └── package.json  # Backend dependencies
└── README.md         # This file
```

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

- Create todos
- List all todos
- Mark todos as completed
- MongoDB integration
- Input validation with Zod
