import { publicProcedure, router } from "../../trpc";
import * as dryAgerController from "./dryAgerController";
import * as types from "../../types";
import * as schemas from "../../db/schemas";
import z from "zod";

export const dryAgerRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
        model: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const [error, res] = await dryAgerController.controlCreateDryAger(
        schemas,
        opts.input,
      );
      if (error) {
        throw error;
      }
      return res;
    }),

  readbyId: publicProcedure.input(z.string()).query(async (opts) => {
    const testSchema = z.number();
    console.log(testSchema.safeParse(opts.input), "test");
    const [error, res] = await dryAgerController.controlGetDryAger(
      schemas,
      opts.input,
    );
    if (error) {
      throw error;
    }
    return res;
  }),

  getUsersDryAgers: publicProcedure.input(z.string()).query(async (opts) => {
    const [error, res] = await dryAgerController.controlGetUsersDryAgers(
      schemas,
      opts.input,
    );
    if (error) {
      throw error;
    }
    return res;
  }),

  changeStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        statusType: z.enum(["light", "fan"]),
        newStatus: z.enum(["on", "off"]),
      }),
    )
    .mutation(async (opts) => {
      const [error, res] = await dryAgerController.controlStatusChange(
        schemas,
        opts.input.id,
        opts.input.statusType,
        opts.input.newStatus,
      );
      console.log(res);
      if (error) {
        throw error;
      }
      return res;
    }),
});

export type dryAgerRouter = typeof dryAgerRouter;
