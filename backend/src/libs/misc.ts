import { config } from "dotenv";
import { resolve } from "node:path";

export function loadEnvironmentVariables(filePath: string) {
  config({
    path: resolve(filePath),
  });
}
