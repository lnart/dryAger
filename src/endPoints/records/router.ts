import config from "dotenv";
import { publicProcedure, router } from "../../trpc";
import * as recordController from "./recordController";
import * as types from "../../types";
import * as schemas from "../../db/schemas";
import z from "zod";

export const recordRouter = router({
  create: publicProcedure
    .input(
      z.object({
        dryAgerId: z.string(),
        date: z.string(),
        humidity: z.number(),
        temperature: z.number(),
        fanActivity: z.enum(["on", "off"]),
        lightActivity: z.enum(["on", "off"]),
      }),
    )
    .mutation(async (opts) => {
      const [error, res] = await recordController.controlRecordCreation(
        schemas,
        opts.input,
      );
      if (error) {
        throw error;
      }
      return res;
    }),
});

export type recordRouter = typeof recordRouter;
