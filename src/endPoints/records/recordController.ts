import * as recordModel from "./recordModel";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import { mqttClient } from "../mqtt/mqtt";
type MqttClient = typeof mqttClient;

export async function controlGetRecordsFromTimeSpan(
  startDate: string,
  endDate: string,
  dryAgerId: string,
) {
  const [error, res] = await recordModel.getRecords(
    startDate,
    endDate,
    dryAgerId,
  );
  if (error) {
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "records were not found",
    });
    return [error, null];
  }
  return [null, res];
}

export async function controlRecordCreation(record: types.WriteRecord) {
  const [error, res] = await recordModel.writeRecord(record);
  if (error) {
    const error = new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return [error, null];
  }
  return [null, res];
}

export async function controlGetRecordsFromRecipe(recipeId: string) {
  const [error, res] = await recordModel.getRecipeById(recipeId);
  if (!res) {
    return [true, null];
  }
  const startDate = res;
}
