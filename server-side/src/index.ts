import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { logger } from "./utils/logger";
import routes from "./routes/router";

const app: Express = express();
const swaggerDoc = YAML.load("app.yaml");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server is listening on ${PORT}`);
});
