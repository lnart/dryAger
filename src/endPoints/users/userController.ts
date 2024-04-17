import * as schemas from "../../db/schemas";
import bcrypt from "bcrypt";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import * as userModel from "./userModel";

export async function createUser(user: types.WriteUser, dryAgerName: string) {
  try {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    const [error, result] = await userModel.writeUser(user, dryAgerName);
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

export async function controlUserUpdate(user: types.WriteUser, id: string) {
  try {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    const [error, result] = await userModel.updateUser(user, id);
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

export async function controlReadUserById(id: string) {
  try {
    const [error, result] = await userModel.readOneById(id);
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

export async function controlReadUserByName(username: string) {
  const [error, result] = await userModel.readOneByUsername(username);
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "No user found",
    });
    return [error, null];
  }
  return [null, result];
}
