import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { createContext } from "./context";
import { appRouter } from "./router/_app";
import { config } from "dotenv";
import { connectToDb } from "./db/db";
import { mqttClient } from "./endPoints/mqtt/mqtt";
config();

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

const PORT = process.env.PORT;

server.listen(PORT);
connectToDb();
mqttClient;

console.log(`server listening on http://localhost:${PORT}`);
