import mongoose from "mongoose";

const { Schema } = mongoose;

const ipAddressSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

const schema = new Schema({
  shortUrlId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ShortenedURL",
  },
  ipAddressData: [ipAddressSchema],
  totalClicks: {
    type: Number,
    default: 0,
  },
});

export const IPAddress = mongoose.model("IPAddress", schema);
