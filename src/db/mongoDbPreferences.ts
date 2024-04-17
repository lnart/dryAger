import { config } from "dotenv";
config();

export enum mongoDbPreferences {
  databaseName = "MeatMatureDB",
  dryAgerCollection = "dryAgers",
  recordsCollection = "records",
}
