import { publicProcedure, router } from "../../trpc";
import z from "zod";
import { getActiveRecipes } from "./recipeController";

export const recipeRouter = router({
  getActiveRecipe: publicProcedure.input(z.string()).query(async (opts) => {
    const [error, res] = await getActiveRecipes("66214a497372963463a87dce");
    console.log(error);
    return res;
  }),
});

export type recipeRouter = typeof recipeRouter;
