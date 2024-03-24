import { connect } from "mqtt";
import { config } from "dotenv";
import * as mqttController from "./mqttController";

config();

const TOPICS: string[] = ["myHome/65e5b01e420a29b71e2d0d6e/record"];

const client = connect(process.env.MQTT_CONNECT_STRING!, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

client.on("connect", async () => {
  try {
    console.log("MQTT Broker connected");
    client.subscribe(TOPICS, () => {
      console.log("subscribed to " + TOPICS);
    });
  } catch (error) {
    console.error(error);
  }
});

client.on("message", async (TOPIC, payload) => {
  if (TOPIC.toString().split("/")[2] === "record") {
    const parsedPayload = JSON.parse(payload.toString());
    const [error, res] = await mqttController.controlRecordPubs(
      TOPIC,
      parsedPayload,
    );
    if (error) throw error;
    return res;
  }
});

client.publish("test/hack", "test");

export const mqttClient = client;
