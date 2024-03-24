import { router } from "../trpc";
import { userRouter } from "../endPoints/users/router";
import { dryAgerRouter } from "../endPoints/dryAgers/router";
import { recordRouter } from "../endPoints/records/router";

export const appRouter = router({
  user: userRouter,
  dryAger: dryAgerRouter,
  record: recordRouter,
});

export type AppRouter = typeof appRouter;
