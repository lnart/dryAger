import { publicProcedure, router } from "../../trpc";
import * as recordController from "./recordController";
import z from "zod";
import { timespanSchema, WriteRecordSchema } from "../../types";

export const recordRouter = router({
  create: publicProcedure.input(WriteRecordSchema).mutation(async (opts) => {
    const [error, res] = await recordController.controlRecordCreation(
      opts.input,
    );
    if (error) {
      throw error;
    }
    return res;
  }),
  getById: publicProcedure.input(z.string()).query(async (opts) => {
    const res = await recordController.controlGetRecordById(opts.input);
    return res;
  }),
  getInTimeSpan: publicProcedure
    .input(timespanSchema)
    .mutation(async (opts) => {
      const [error, res] = await recordController.controlGetRecordsInTimeSpan(
        opts.input.dryAgerId,
        opts.input.startDate,
        opts.input.endDate,
      );
      if (error) {
        throw error;
      }
      return res;
    }),
  getAll: publicProcedure.input(z.string()).query(async (opts) => {
    const [error, res] = await recordController.controlGetAll(opts.input);
    if (error) {
      throw error;
    }
    return res;
  }),
});

export type recordRouter = typeof recordRouter;
