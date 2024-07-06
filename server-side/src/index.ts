import express, { Express } from "express";
import { logger } from "./utils/logger";

const app: Express = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server is listening on ${PORT}`);
});
