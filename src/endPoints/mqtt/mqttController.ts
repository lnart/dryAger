import * as types from "../../types";
import axios from "axios";
import { TRPCError } from "@trpc/server";
import { getDryAgerById } from "../dryAgers/dryAgerModel";
import { mqttClient } from "./mqtt";
import { controlRecordCreation } from "../records/recordController";

export async function controlRecordPubs(
  TOPIC: string,
  payload: types.recordPayload,
) {
  try {
    const validationResult = types.recordPayloadSchema.safeParse(payload);
    if (validationResult.success) {
      const body = {
        dryAgerId: TOPIC.split("/")[1],
        date: new Date(),
        humidity: validationResult.data.humidity,
        temperature: validationResult.data.temperature,
        fanActivity: validationResult.data.fanActivity,
        lightActivity: validationResult.data.lightActivity,
      };

      const [error, res] = await controlRecordCreation(body);
      console.log(await res);
      return [null, true];
    }
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "wrong payload",
    });
    return [error, null];
  } catch (error) {
    console.error(error);
    const err = new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return [err, null];
  }
}

export async function subscribeToNewDryager(dryAgerId: string) {
  try {
    const [error, dryAger] = await getDryAgerById(dryAgerId);
    console.log(dryAger);
    //@ts-ignore
    const username = dryAger.user.username.split(" ").join("_");
    const topic: string = username + "/" + dryAgerId;
    (await mqttClient).subscribe(topic, () => {
      console.log("subscribed to new topic: " + topic);
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
