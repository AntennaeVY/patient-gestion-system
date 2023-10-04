import express from "express";

import routes from "./v1/routes";
import { loadEnvironmentVariables } from "./v1/libs/misc";

loadEnvironmentVariables(".env");
const PORT = process.env.PORT as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
