import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import shortenRoute from "./routes/shorten.js";

dotenv.config({
  path: "./config/config.env",
});
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS middleware
app.use(
  cors({
    origin: "process.env.FRONTEND_URL",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/v1", shortenRoute);

// Default route for testing the site
app.get("/", (req, res) => res.send(`<h1>Site is Working.</h1>`));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

export default app;
