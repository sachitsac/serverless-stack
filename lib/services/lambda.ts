import { join } from "path";
import { Runtime } from "@aws-cdk/aws-lambda";
import { Duration, Stack } from "@aws-cdk/core";
import { buildLambda } from "../utils/build-lambda";

export const lambda = (stack: Stack, handler: string, entry: string) =>
  buildLambda(stack, `${handler}Handler`, {
    timeout: Duration.seconds(5),
    memorySize: 2048,
    runtime: Runtime.NODEJS_14_X,
    handler,
    entry: join(__dirname, "/../", entry),
    bundling: {
      minify: true,
      externalModules: ["aws-sdk"],
    },
  });
