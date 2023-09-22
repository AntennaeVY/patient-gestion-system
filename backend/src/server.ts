import express from "express";

import routes from "./v1/routes";
import { loadEnvironmentVariables } from "./libs/misc";

loadEnvironmentVariables(".env");
const PORT = process.env.PORT as string;

const app = express();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
