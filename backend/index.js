// TODO Split routes in files, ex: routes/todos.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// import { PrismaClient } from '@prisma/client'; doesnt work on node 24

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const app = express();

const PORT = process.env.PORT || 5001;

const prisma = new PrismaClient();

// --- Middlewares ---
// Enable CORS (Cross-Origin Resource Sharing) to allow your frontend
// (on localhost:3000) to make requests to your backend (on localhost:5000).
app.use(cors());

// Enable the express.json middleware to parse JSON request bodies
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Hello from the Express backend!', status: 'OK' });
});

app.post('/api/todos', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Todo content is required' });
    }

    const [_, newTodo] = await prisma.$transaction([
      prisma.todo.updateMany({
        data: {
          order: {
            increment: 1,
          },
        },
      }),

      prisma.todo.create({
        data: {
          content: content,
          order: 0,
        },
      }),
    ]);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(500).json({ error: 'Unable to create todo.' });
  }
});

app.put('/api/todos/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: !todo.completed },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { order: 'asc' } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/todos/reorder', async (req, res) => {
  try {
    const { order } = req.body;

    if (!Array.isArray(order)) {
      return res.status(400).json({ error: 'Expected an array of IDs.' });
    }

    for (const [index, id] of order.entries()) {
      await prisma.todo.update({
        where: { id: id },
        data: { order: index },
      });
    }

    res.status(200).json({ message: 'Todo order updated successfully.' });
  } catch (error) {
    console.error('Failed to reorder todos:', error);
    res.status(500).json({ error: 'Unable to reorder todos.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
