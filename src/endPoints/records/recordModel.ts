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

export async function writeRecord(record: types.WriteRecord) {
  const res = recordModel.create(record);
  if (record) {
    return [null, res];
  }
  return [true, null];
}

export async function getRecordById(recordId: string) {
  const res = await recordModel.findById(recordId);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function getRecordsInTimeSpan(
  dryAgerId: string,
  startDate: Date,
  endDate: Date,
) {
  const res = await recordModel.find({
    dryAgerId: dryAgerId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  if (res) {
    return [null, res];
  }
  return [true, null];
}

export async function getRecordsFromDryAger(id: string) {
  const res = await recordModel.find({ dryAgerId: id });

  if (res) {
    return [null, res];
  }
  return [true, null];
}
