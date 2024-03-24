import * as schemas from "../../db/schemas";
import bcrypt from "bcrypt";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import * as userModel from "./userModel";

export async function createUser(
  schema: typeof schemas,
  user: types.WriteUser,
) {
  try {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    const [error, result] = await userModel.writeUser(schema, user);
    if (error) {
      const error = new TRPCError({
        message: "user was not created",
        code: "INTERNAL_SERVER_ERROR",
      });
      return [error, null];
    }
    return [null, result];
  } catch (error) {
    console.error(error);
    return [error, null];
  }
}

export async function controlUserUpdate(
  schema: typeof schemas,
  user: types.WriteUser,
  id: string,
) {
  try {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    const [error, result] = await userModel.updateUser(schema, user, id);
    if (error) {
      const error = new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "user was not updated",
      });
      return [error, null];
    }
    return [null, result];
  } catch (error) {
    console.error(error);
    return [error, null];
  }
}

export async function controlReadUserById(schema: typeof schemas, id: string) {
  try {
    const [error, result] = await userModel.readOneById(schema, id);
    if (error) {
      const error = new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No user found",
      });
      return [error, null];
    }
    return [null, result];
  } catch (error) {
    console.error(error);
    return [error, null];
  }
}

export async function controlReadUserByName(
  schema: typeof schemas,
  username: string,
) {
  const [error, result] = await userModel.readOneByUsername(schema, username);
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "No user found",
    });
    return [error, null];
  }
  return [null, result];
}
