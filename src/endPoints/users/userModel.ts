import * as schemas from "../../db/schemas";
import * as types from "../../types";
import { dryAgerModel } from "../../db/schemas";

export async function writeUser(user: types.WriteUser, dryAgerName: string) {
  const result = await dryAgerModel.create({
    name: dryAgerName,
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function updateUser(user: types.WriteUser, id: string) {
  const result = await dryAgerModel.updateOne(
    { _id: id },
    {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    },
  );
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function readOneById(id: string) {
  const result = await dryAgerModel.findOne({ "user._id": id });
  if (!result) {
    return [true, null];
  }
  return [null, result.user];
}

export async function readOneByUsername(username: string) {
  const result = await dryAgerModel.findOne({
    "user.username": username,
  });
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function checkIfUserExist(id: string) {
  const result = await dryAgerModel.find({ "user.user_id": id });
  if (!result) {
    return false;
  }
  return true;
}
