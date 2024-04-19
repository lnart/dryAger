import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  notes: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const UserSchema = z.object({
  password: z.string(),
  username: z.string(),
  email: z.string(),
});

export const WriteUserSchema = z.object({
  username: z.string(),
  email: z.string().email().optional(),
  password: z.string(),
});

export const StatusSchema = z.object({
  light: z.enum(["on", "off"]),
  fan: z.enum(["on", "off"]),
});

export const RecordSchema = z.object({
  dryAgerId: z.string(),
  date: z.date(),
  humidity: z.number(),
  temperature: z.number(),
  fanActivity: z.enum(["on", "off"]),
  lightActivity: z.enum(["on", "off"]),
});

export const WriteRecordSchema = RecordSchema.omit({
  date: true,
});

export const timespanSchema = z.object({
  dryAgerId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const DryAgerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  status: StatusSchema,
  user: UserSchema,
  recipes: z.array(RecipeSchema),
});

export const WriteDryAgerSchema = DryAgerSchema.omit({
  _id: true,
  user: true,
  status: true,
  recipes: true,
  records: true,
});

export const updateDryAgerSchema = DryAgerSchema.omit({
  _id: true,
});

export const recordPayloadSchema = z.object({
  humidity: z.number(),
  temperature: z.number(),
  fanActivity: z.enum(["on", "off"]),
  lightActivity: z.enum(["on", "off"]),
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type User = z.infer<typeof UserSchema>;
export type WriteUser = z.infer<typeof WriteUserSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type DryAger = z.infer<typeof DryAgerSchema>;
export type WriteDryAger = z.infer<typeof WriteDryAgerSchema>;
export type Record = z.infer<typeof RecordSchema>;
export type WriteRecord = z.infer<typeof WriteRecordSchema>;
export type recordPayload = z.infer<typeof recordPayloadSchema>;
