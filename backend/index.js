import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { PrismaClient } from '@prisma/client';


// Initialize the Express app
const app = express();

// Define the port. Use an environment variable or default to 5001
const PORT = process.env.PORT || 5001;

const prisma = new PrismaClient();

// --- Middlewares ---
// Enable CORS (Cross-Origin Resource Sharing) to allow your frontend
// (on localhost:3000) to make requests to your backend (on localhost:5001).
app.use(cors());

// Enable the express.json middleware to parse JSON request bodies
app.use(express.json());



app.get('/api/health', (req, res) => {
  res.json({ message: "Hello from the Express backend!", status: "OK" });
});


app.post('/api/todos', async (req, res) => {
  try {

    const { content } = req.body;


    if (!content) {
      return res.status(400).json({ error: 'Todo content is required' });
    }


    const newTodo = await prisma.todo.create({
      data: {
        content: content,
      },
    });

    
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Failed to create todo:", error);
    res.status(500).json({ error: 'Unable to create todo.' });
  }
});

app.get('/api/todos', async (req, res) => {
  try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});