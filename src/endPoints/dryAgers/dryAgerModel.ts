import * as types from "../../types";
import { dryAgerModel } from "../../db/schemas";

export async function initializeSignUp(obj: types.DryAger) {
  const res = await dryAgerModel.create(obj);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function getDryAgerById(id: string) {
  const res = await dryAgerModel.findById(id);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function getDryAgersByUserId(id: string) {
  const res = await dryAgerModel.find({ "user._id": id });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function createDryAger(obj: types.WriteDryAger, user: types.User) {
  const res = await dryAgerModel.create({
    name: obj.name,
    user: user,
  });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function changeLightStatus(id: string, newStatus: "on" | "off") {
  const res = await dryAgerModel.updateOne(
    { _id: id },
    { $set: { "status.light": newStatus } },
  );
  if (res.modifiedCount === 0) {
    return [true, null];
  }
  return [null, res];
}
export async function changeFanStatus(id: string, newStatus: "on" | "off") {
  const res = await dryAgerModel.updateOne(
    { _id: id },
    { $set: { "status.fan": newStatus } },
  );
  if (res.modifiedCount === 0) {
    return [true, null];
  }
  return [null, res];
}

export async function getAllDryAger() {
  const res = await dryAgerModel.find();
  return res;
}
