import { config } from "dotenv";
config();

export enum mongoDbPreferences {
  databaseName = "dryAger",
  dryAgerCollection = "DryAgers",
  usersCollection = "Users",
  recordsCollection = "Records",
  recipesColleciton = "Recipes",
}
