import * as recordModel from "./recordModel";
import * as types from "../../types";
import { TRPCError } from "@trpc/server";
import { mqttClient } from "../mqtt/mqtt";
type MqttClient = typeof mqttClient;

export async function controlGetRecordsFromTimeSpan(
  schema: types.Schema,
  startDate: string,
  endDate: string,
  dryAgerId: string,
) {
  const [error, res] = await recordModel.getRecords(
    schema,
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

export async function controlRecordCreation(
  schema: types.Schema,
  record: types.WriteRecord,
) {
  const [error, res] = await recordModel.writeRecord(schema, record);
  if (error) {
    const error = new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return [error, null];
  }
  return [null, res];
}

export async function controlGetRecordsFromRecipe(
  recipeId: string,
  schema: types.Schema,
) {
  const [error, res] = await recordModel.getRecipeById(recipeId, schema);
  if (!res) {
    return [true, null];
  }
  const startDate = res;
}
