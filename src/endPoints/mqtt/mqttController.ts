import * as types from "../../types";
import axios from "axios";
import { TRPCError } from "@trpc/server";

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
      const res = await axios.post(
        `${process.env.BASE_URL}/record.create`,
        body,
      );
      console.log(res.status, res.data);
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
