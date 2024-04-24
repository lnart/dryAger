import { router } from "../trpc";
import { userRouter } from "../endPoints/users/router";
import { dryAgerRouter } from "../endPoints/dryAgers/router";
import { recordRouter } from "../endPoints/records/router";
import { recipeRouter } from "../endPoints/recipes/router";

export const appRouter = router({
  user: userRouter,
  dryAger: dryAgerRouter,
  record: recordRouter,
  recipe: recipeRouter,
});

export type AppRouter = typeof appRouter;
