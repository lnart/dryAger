import config from "dotenv";
import { publicProcedure, router } from "../../trpc";
import * as userController from "./userController";
import * as types from "../../types";
import * as schemas from "../../db/schemas";
import z from "zod";

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async (opts) => {
      console.log(opts.input, opts.ctx.req);
      const [error, res] = await userController.createUser(schemas, opts.input);
      if (error) {
        throw error;
      }
      return res;
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const userObject = {
        username: opts.input.username,
        email: opts.input.email,
        password: opts.input.password,
      };
      const [error, res] = await userController.controlUserUpdate(
        schemas,
        userObject,
        opts.input.id,
      );
      if (error) {
        throw error;
      }
      return true;
    }),

  getOne: publicProcedure.input(z.string()).query(async (opts) => {
    //@ts-ignore
    const [error, res] = await userController.controlReadUserById(
      schemas,
      opts.input,
    );
    if (error) {
      throw error;
    }
    return res;
  }),

  getByUsername: publicProcedure.input(z.string()).query(async (opts) => {
    const [error, res] = await userController.controlReadUserByName(
      schemas,
      opts.input,
    );
    if (error) {
      throw error;
    }
    return res;
  }),

  test: publicProcedure.query(()=>{
    return 'success'
  })
});

export type userRouter = typeof userRouter;
