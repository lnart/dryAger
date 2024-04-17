import { publicProcedure, router } from "../../trpc";
import * as dryAgerController from "./dryAgerController";
import * as types from "../../types";
import z from "zod";

export const dryAgerRouter = router({
  create: publicProcedure
    .input(types.WriteDryAgerSchema.extend({ userId: z.string() }))
    .mutation(async (opts) => {
      const [error, res] = await dryAgerController.controlCreateDryAger(
        opts.input,
        opts.input.userId,
      );
      if (error) {
        throw error;
      }
      return res;
    }),

  readById: publicProcedure.input(z.string()).query(async (opts) => {
    const [error, res] = await dryAgerController.controlGetDryAger(opts.input);
    if (error) {
      throw error;
    }
    return res;
  }),

  getUsersDryAgers: publicProcedure.input(z.string()).query(async (opts) => {
    const [error, res] = await dryAgerController.controlGetUsersDryAgers(
      opts.input,
    );
    if (error) {
      throw error;
    }
    return res;
  }),

  changeLightStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        newStatus: z.enum(["on", "off"]),
      }),
    )
    .mutation(async (opts) => {
      const res = await dryAgerController.controlStatusChange(
        opts.input.id,
        "light",
        opts.input.newStatus,
      );
      return res;
    }),
});

export type dryAgerRouter = typeof dryAgerRouter;
