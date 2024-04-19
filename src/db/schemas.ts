import mongoose, { Schema } from "mongoose";

const dryAgerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    light: { type: String, enum: ["on", "off"], default: "off" },
    fan: { type: String, enum: ["on", "off"], default: "off" },
  },
  user: {
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
  },
  recipes: [
    {
      title: { type: String, required: true },
      description: { type: String, required: false },
      notes: { type: String, required: true },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
});
export const dryAgerModel = mongoose.model("DryAger", dryAgerSchema);

const recordSchema = new mongoose.Schema({
  dryAgerId: { type: Schema.ObjectId, ref: "DryAger" },
  date: { type: Date, required: true, default: new Date() },
  humidity: { type: Number },
  temperature: { type: Number },
  fanActivity: { type: String, enum: ["on", "off"] },
  lightActivity: { type: String, enum: ["on", "off"] },
});

export const recordModel = mongoose.model("Record", recordSchema);
