import * as dryAgerModel from "./dryAgerModel";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import { readOneById } from "../users/userModel";

export async function controlGetDryAger(id: string) {
  const [error, res] = await dryAgerModel.getDryAgerById(id);
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "DryAger doesnt exist",
    });
    return [error, null];
  }
  return [null, res];
}

export async function controlCreateDryAger(
  dryAgerObject: types.WriteDryAger,
  userId: string,
) {
  const user = await readOneById(userId);
  const validator = types.UserSchema.safeParse(user);
  if (validator.success === true) {
    const [error, res] = await dryAgerModel.createDryAger(
      dryAgerObject,
      validator.data.username,
    );
    if (error) {
      const error = new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "DryAger wasnt created",
      });
      return [error, null];
    }
    return [null, res];
  }
  const error = new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "no user with this user id found",
  });
  return [error, null];
}

export async function controlStatusChange(
  id: string,
  statusType: "light" | "fan",
  newStatus: "on" | "off",
) {
  if (statusType === "light") {
    const [error, res] = await dryAgerModel.changeLightStatus(id, newStatus);
    if (error) {
      const error = new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "status wasnt changed",
      });
      return [error, null];
    }
    return [null, res];
  } else if (statusType === "fan") {
    const [error, res] = await dryAgerModel.changeFanStatus(id, newStatus);
    if (error) {
      const error = new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "status wasnt changed",
      });
      return [error, null];
    }
    return [null, res];
  }
}

export async function controlGetUsersDryAgers(id: string) {
  const [error, res] = await dryAgerModel.getDryAgersByUserId(id);
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "users dry agers were not found",
    });
    return [error, res];
  }
  return [null, res];
}
