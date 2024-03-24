import { z } from "zod";
import * as schemas from "./db/schemas";

export type User = {
  _id: string; // or `ObjectId` if using a type that represents MongoDB's ObjectId
  username: string;
  email: string;
  password: string;
  dryAgerIds: string[];
};

export type WriteUser = {
  username: string;
  email: string;
  password: string;
};

export type EditUser = {
  id: string;
  username?: string;
  password?: string;
  email?: string;
};

export const testSchema = z
  .object({
    username: z.string().optional(),
    id: z.string().optional(),
  })
  .refine(
    (data) => {
      // Ensure exactly one of the properties is provided
      return (data.username && !data.id) || (!data.username && data.id);
    },
    {
      message: "Either 'username' or 'id' must be provided, but not both.",
    },
  );

export type DryAger = {
  _id: string;
  userId: string; // Reference to User
  name: string;
  model: string;
  status: {
    light: "on" | "off";
    fan: "on" | "off";
  };
};

export type WriteDryAger = {
  userId: string; // Reference to User
  name: string;
  model: string;
};

export type Record = {
  _id: string;
  dryAgerId: string; // Reference to DryAger
  date: Date;
  humidity: number; // Assuming humidity is stored as a number for calculation purposes
  temperature: number;
  fanActivity: "on" | "off";
  lightActicity: "on" | "off";
};

export type WriteRecord = {
  dryAgerId: string; // Reference to DryAger
  date: string;
  humidity: number; // Assuming humidity is stored as a number for calculation purposes
  temperature: number;
  fanActivity: "on" | "off";
  lightActivity: "on" | "off";
};

export type Recipe = {
  _id: string;
  userId: string; // Reference to User
  name: string;
  description: string;
  notes: string;
  dryAgerId: string; // Reference to DryAger
  startDate: Date;
  endDate: Date;
  relatedRecords?: string[]; // Optional, references to Records
};

const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  dryAgerIds: z.array(z.string()),
});

const DryAgerSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  model: z.string(),
  status: z.object({
    light: z.enum(["on", "off"]),
    fan: z.enum(["on", "off"]),
  }),
});

const RecordSchema = z.object({
  _id: z.string(),
  dryAgerId: z.string(),
  date: z.date(),
  humidity: z.number(),
  temperature: z.number(),
  fanActivity: z.enum(["on", "off"]),
});

const RecipeSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  notes: z.string(),
  dryAgerId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  relatedRecords: z.array(z.string()).optional(),
});

export type recordPayload = {
  humidity: number;
  temperature: number;
  fanActivity: "on" | "off";
  lightActivity: "on" | "off";
};

export const recordPayloadSchema = z.object({
  humidity: z.number(),
  temperature: z.number(),
  fanActivity: z.enum(["on", "off"]),
  lightActivity: z.enum(["on", "off"]),
});

export type Schema = typeof schemas;

// Export the schemas
export { UserSchema, DryAgerSchema, RecordSchema, RecipeSchema };
