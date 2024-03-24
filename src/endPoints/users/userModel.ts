import * as schemas from "../../db/schemas";
import * as types from "../../types";

export async function writeUser(schema: typeof schemas, user: types.WriteUser) {
  const result = await schema.User.create({
    username: user.username,
    password: user.password,
    email: user.email,
  });
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function updateUser(
  schema: typeof schemas,
  user: types.WriteUser,
  id: string,
) {
  const result = await schema.User.updateOne(
    { _id: id },
    {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  );
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function readOneById(schema: typeof schemas, id: string) {
  const result = await schema.User.findById(id);
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function readOneByUsername(
  schema: typeof schemas,
  username: string,
) {
  const result = await schema.User.findOne({
    username: username,
  });
  if (!result) {
    return [true, null];
  }
  return [null, result];
}

export async function checkIfUserExist(schema: types.Schema, id: string) {
  const result = await schema.User.findById(id);
  if (!result) {
    return false;
  }
  return true;
}
