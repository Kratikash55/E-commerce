const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");

const apiRouter = require("./routes/api");

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Successfully Connected To MongoDB Atlas");
  })
  .catch((error) => {
    console.log("❌ MongoDB Error:", error);
  });

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-name.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Static Folder
app.use("/uploads", express.static("public/uploads"));

// API Routes
app.use("/api", apiRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});