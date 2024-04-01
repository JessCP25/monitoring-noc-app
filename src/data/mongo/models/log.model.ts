import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  level: {
    type: String,
    enum: ["lower", "medium", "high"],
    default: "lower",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = mongoose.model("Log", logSchema);
