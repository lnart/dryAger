import mongoose from "mongoose";

const dryAgerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: {
    light: { type: String, enum: ["on", "off"], default: "off" },
    fan: { type: String, enum: ["on", "off"], default: "off" },
  },
  user: {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
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
  records: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Record",
  },
});
export const dryAgerModel = mongoose.model("DryAger", dryAgerSchema);

const recordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  humidity: { type: Number },
  temperature: { type: Number },
  fanActivity: { type: String, enum: ["on", "off"] },
  lightActivity: { type: String, enum: ["on", "off"] },
});

export const recordModel = mongoose.model("Record", recordSchema);
