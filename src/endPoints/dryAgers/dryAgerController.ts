import * as dryAgerModel from "./dryAgerModel";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import { checkIfUserExist } from "../users/userModel";

export async function controlGetDryAger(schema: types.Schema, id: string) {
  const [error, res] = await dryAgerModel.getDryAgerById(schema, id);
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
  schema: types.Schema,
  dryAgerObject: types.WriteDryAger,
) {
  const userCheck = await checkIfUserExist(schema, dryAgerObject.userId);
  if (userCheck) {
    const [error, res] = await dryAgerModel.createDryAger(
      schema,
      dryAgerObject,
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
  schema: types.Schema,
  id: string,
  statusType: "light" | "fan",
  newStatus: "on" | "off",
) {
  const [error, res] = await dryAgerModel.changeStatus(
    schema,
    id,
    statusType,
    newStatus,
  );
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "status wasnt changed",
    });
    return [error, null];
  }
  return [null, res];
}

export async function controlGetUsersDryAgers(
  schema: types.Schema,
  id: string,
) {
  const [error, res] = await dryAgerModel.getDryAgersByUserId(schema, id);
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "users dry agers were not found",
    });
    return [error, res];
  }
  return [null, res];
}
