import mongoose from "mongoose";
import { config } from "dotenv";

config();

export async function connectToDb() {
  if (process.env.CLOUD_DB_CONNECTION_STRING) {
    const db = await mongoose
      .connect(`${process.env.CLOUD_DB_CONNECTION_STRING}`)
      .then(() => console.log(`Successfully connected to MongoDB`))
      .catch((error) => console.error(`Connection error: ${error}`));
    return db;
  }
}
export type dbConnection = typeof connectToDb;
