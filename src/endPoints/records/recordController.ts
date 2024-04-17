import * as recordModel from "./recordModel";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import { mqttClient } from "../mqtt/mqtt";
import { start } from "repl";
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
