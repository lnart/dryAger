import mongoose from "mongoose";
import { config } from "dotenv";
import { mongoDbPreferences } from "./mongoDbPreferences";

config();

export async function connectToDb() {
  if (process.env.DB_CONNECTION_STRING) {
    const db = await mongoose
      .connect(
        `${process.env.DB_CONNECTION_STRING}/${mongoDbPreferences.databaseName}`,
      )
      .then(() => console.log(`Successfully connected to MongoDB`))
      .catch((error) => console.error(`Comnnection error: ${error}`));
    return db;
  }
}
export type dbConnection = typeof connectToDb;
