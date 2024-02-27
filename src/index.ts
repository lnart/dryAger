import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { createContext } from "./context";
import { appRouter } from "./router/app";
import { config } from "dotenv";
config()

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

const PORT = process.env.PORT

server.listen(PORT);

console.log(`server listening on http://localhost:${PORT}`);
