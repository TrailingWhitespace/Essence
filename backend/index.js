import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import todosRouter from './routes/todos.js'

const app = express();

const PORT = process.env.PORT || 5001;



// --- Middlewares ---
// Enable CORS (Cross-Origin Resource Sharing) to allow your frontend
// (on localhost:3000) to make requests to your backend (on localhost:5000).
app.use(cors());

// Enable the express.json middleware to parse JSON request bodies
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Hello from the Express backend!', status: 'OK' });
});

app.use('/api/todos', todosRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
