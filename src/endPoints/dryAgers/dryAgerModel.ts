import * as types from "../../types";
import { checkIfUserExist } from "../users/userModel";

export async function getDryAgerById(schema: types.Schema, id: string) {
  const res = await schema.DryAger.findById(id);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function getDryAgersByUserId(schema: types.Schema, id: string) {
  const res = await schema.DryAger.findOne({ userId: id });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function createDryAger(
  schema: types.Schema,
  dryAgerObject: types.WriteDryAger,
) {
  const res = await schema.DryAger.create({
    userId: dryAgerObject.userId,
    name: dryAgerObject.name,
    model: dryAgerObject.model,
  });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function changeStatus(
  schema: types.Schema,
  id: string,
  statusType: "light" | "fan",
  newStatus: "on" | "off",
) {
  const prop = "status." + statusType;
  const res = await schema.DryAger.updateOne(
    { _id: id },
    { $set: { "status.fan": newStatus } },
  );
  if (res.modifiedCount === 0) {
    return [true, null];
  }
  return [null, res];
}
