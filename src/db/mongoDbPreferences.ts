import { config } from "dotenv";
config();

export enum mongoDbPreferences {
  databaseName = "MeatMatureDB",
  dryAgerCollection = "dryAgers",
  usersCollection = "users",
  recordsCollection = "records",
  recipesColleciton = "recipes",
}
