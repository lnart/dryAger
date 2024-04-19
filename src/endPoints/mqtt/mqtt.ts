import { connect } from "mqtt";
import { config } from "dotenv";
import { controlRecordPubs } from "./mqttController";
import { getAllTopics } from "./mqttModel";

config();

async function mqttOnStart() {
  console.log(getAllTopics);
  const topics: string[] = await getAllTopics();
  const client = connect(process.env.MQTT_CONNECT_STRING!, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  });

  client.on("connect", async () => {
    try {
      console.log("MQTT Broker connected");
      client.subscribe(topics, () => {
        console.log("subscribed to " + topics.length + " Topics");
      });
    } catch (error) {
      console.error(error);
    }
  });

  client.on("message", async (TOPIC, payload) => {
    const parsedPayload = JSON.parse(payload.toString());
    console.log(parsedPayload);
    const [error, res] = await controlRecordPubs(TOPIC, parsedPayload);
    if (error) throw error;
    return res;
  });

  client.publish("test/hack", "test");
  return client;
}

const client = mqttOnStart();

export const mqttClient = client;
