import express from 'express';
const todosRouter = express.Router();
import prisma from '../lib/prisma.js';


todosRouter.post('/', async (req, res) => {
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

todosRouter.put('/:id/toggle', async (req, res) => {
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

todosRouter.put('/:id/update', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { content: content },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todosRouter.delete('/:id', async (req, res) => {
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

todosRouter.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { order: 'asc' } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todosRouter.put('/reorder', async (req, res) => {
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

export default todosRouter;
