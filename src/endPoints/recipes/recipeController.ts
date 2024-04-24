import { ObjectId } from "mongodb";
import * as recipeModel from "./recipeModel";
import * as types from "../../types";

export async function getActiveRecipes(dryagerid: string) {
  const objectId = new ObjectId(dryagerid);
  const [error, res] = await recipeModel.getActiveRecipe(objectId);
  if (error) {
    return [error, null];
  }

  return [null, res];
}
