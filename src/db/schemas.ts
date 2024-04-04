import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dryAgerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "DryAger" }],
});

export const User = mongoose.model("user", userSchema);
export type UserType = typeof userSchema;

export const dryAgerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  name: { type: String, required: true },
  model: String,
  status: {
    light: { type: String, enum: ["on", "off"], default: "off" },
    fan: { type: String, enum: ["on", "off"], default: "off" },
  },
});

export const DryAger = mongoose.model("dryAger", dryAgerSchema);

export const recordSchema = new mongoose.Schema({
  dryAgerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dryAger",
    required: true,
  },
  date: { type: Date, default: Date.now },
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  fanActivity: { type: String, enum: ["on", "off"], required: true },
  lightActivity: { type: String, enum: ["on", "off"], required: true },
});

recordSchema.index({ dryAgerId: 1, date: -1 });

export const Record = mongoose.model("record", recordSchema);

export const recipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  name: { type: String, required: true },
  description: String,
  notes: String,
  dryAgerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dryAger",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  relatedRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "record" }],
});

export const Recipe = mongoose.model("recipe", recipeSchema);
