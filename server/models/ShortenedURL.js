import mongoose from "mongoose";

const schema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ShortenedURL = mongoose.model("ShortenedURL", schema);
