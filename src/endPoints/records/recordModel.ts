import { start } from "repl";
import { recordModel } from "../../db/schemas";
import * as types from "../../types";
import { ObjectId } from "mongodb";

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

export async function calcAverage(
  dryAgerId: string,
  startDate: Date,
  endDate: Date,
) {
  const res = await recordModel.aggregate([
    {
      $match: {
        dryAgerId: new ObjectId(dryAgerId),
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        averageHumidity: { $avg: "$humidity" },
        averageTemperature: { $avg: "$temperature" },
      },
    },
  ]);
  console.log(res[0]);
  return res[0];
}

export async function calcAlltimeAverage(dryAgerId: string) {
  const res = await recordModel.aggregate([
    {
      $match: {
        dryAgerId: new ObjectId(dryAgerId),
      },
    },
    {
      $group: {
        _id: null,
        averageHumidity: { $avg: "$humidity" },
        averageTemperature: { $avg: "$temperature" },
      },
    },
  ]);
  console.log(res[0]);
  return res[0];
}
calcAlltimeAverage("66214a497372963463a87dce");
