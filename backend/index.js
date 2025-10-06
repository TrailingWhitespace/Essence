import express from 'express';
import cors from 'cors';

// Initialize the Express app
const app = express();

// Define the port. Use an environment variable or default to 5001
const PORT = process.env.PORT || 5001;

// --- Middlewares ---
// Enable CORS (Cross-Origin Resource Sharing) to allow your frontend
// (on localhost:3000) to make requests to your backend (on localhost:5001).
app.use(cors());

// Enable the express.json middleware to parse JSON request bodies
app.use(express.json());


// --- Routes ---
// A simple test route to confirm the server is working
app.get('/api/health', (req, res) => {
  res.json({ message: "Hello from the Express backend!", status: "OK" });
});


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});