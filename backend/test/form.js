// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON body

// POST route to accept form data
app.post("/api/form", (req, res) => {
  const { name, email } = req.body;
  console.log("Received data:", req.body);

  res.json({ message: `Hello ${name}, we received your email: ${email}` });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});