import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected on ${process.env.MONGO_URI}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;

// jaighai8
// oIYf4LcH86FAUxJe;
// mongodb://127.0.0.1:27017/url
