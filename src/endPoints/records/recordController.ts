import * as recordModel from "./recordModel";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import { mqttClient } from "../mqtt/mqtt";
import { start } from "repl";
import { getAllDryAger } from "../dryAgers/dryAgerModel";
type MqttClient = typeof mqttClient;

export async function controlRecordCreation(record: types.WriteRecord) {
  const [error, res] = await recordModel.writeRecord(record);
  if (error) {
    const error = new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return [error, null];
  }
  return [null, res];
}

export async function controlGetRecordById(recipeId: string) {
  const [error, res] = await recordModel.getRecordById(recipeId);
  if (!res) {
    return [true, null];
  }
  return [null, res];
}

export async function controlGetRecordsInTimeSpan(
  dryAgerId: string,
  startDate: string,
  endDate: string,
) {
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);
  const [error, res] = await recordModel.getRecordsInTimeSpan(
    dryAgerId,
    formattedStartDate,
    formattedEndDate,
  );
  if (error) {
    const error = new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return [error, null];
  }
  return [null, res];
}

export async function controlGetAll(id: string) {
  const [error, res] = await recordModel.getRecordsFromDryAger(id);
  if (error) {
    return [error, null];
  }
  return [null, res];
}

export function detectAnomalies(
  avg: types.AverageRecord,
  records: types.Record[],
  threshold: types.Thresholds,
) {
  for (let i = 0; i < records.length; i++) {
    if (Math.abs(records[i].humidity - threshold.humidity) > 0) {
    }
  }
}

export async function checkAnomalies() {
  const dryAgers = await getAllDryAger();
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 10 * 60000);
  const validator = types.ArrayOfDryAgerSchema.safeParse(dryAgers);
  if (validator.success === true) {
    for (let i = 0; i < dryAgers.length; i++) {
      const averageData = await recordModel.calcAlltimeAverage(
        validator.data[i]._id,
      );
      const records = recordModel.getRecordsInTimeSpan(
        validator.data[i]._id,
        startDate,
        endDate,
      );
    }
  }
}
