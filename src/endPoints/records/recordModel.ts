import { Schema } from "../../types";
import * as types from "../../types";

export async function getRecords(
  schema: Schema,
  start: string,
  end: string,
  dryAgerId: string,
) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const res = await schema.Record.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
    dryAgerId: dryAgerId,
  });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function writeRecord(schema: Schema, record: types.WriteRecord) {
  const res = await schema.Record.create({
    ...record,
  });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function getRecipeById(recipeId: string, schema: Schema) {
  const res = await schema.Recipe.findById(recipeId);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}
