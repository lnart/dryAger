import { recordModel } from "../../db/schemas";
import * as types from "../../types";

export async function getRecords(
  start: string,
  end: string,
  dryAgerId: string,
) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const res = await recordModel.find({
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

export async function writeRecord(record: any) {
  const res = await recordModel.create({
    ...record,
  });
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function getRecipeById(recipeId: string) {
  const res = await recordModel.findById(recipeId);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}
