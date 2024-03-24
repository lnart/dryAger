import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dryAgerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "DryAger" }],
});

export const User = mongoose.model("User", userSchema);
export type UserType = typeof userSchema;

export const dryAgerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  model: String,
  status: {
    light: { type: String, enum: ["on", "off"], default: "off" },
    fan: { type: String, enum: ["on", "off"], default: "off" },
  },
  // Assuming records are referenced in the Records collection, not stored directly
});

export const DryAger = mongoose.model("DryAger", dryAgerSchema);

export const recordSchema = new mongoose.Schema({
  dryAgerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryAger",
    required: true,
  },
  date: { type: Date, default: Date.now },
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  fanActivity: { type: String, enum: ["on", "off"], required: true },
  lightActivity: { type: String, enum: ["on", "off"], required: true },
});

recordSchema.index({ dryAgerId: 1, date: -1 });

export const Record = mongoose.model("Record", recordSchema);

export const recipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  notes: String,
  dryAgerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryAger",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  relatedRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
