import app from "./app.js";
import connectDB from "./config/connectDB.js";

// database connection
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
