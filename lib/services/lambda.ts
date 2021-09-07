import { join } from "path";
import { Runtime } from "@aws-cdk/aws-lambda";
import { Duration, Stack } from "@aws-cdk/core";
import { buildLambda } from "../utils/build-lambda";

export const lambda = (stack: Stack) =>
  buildLambda(stack, "AppSyncNotesHandler", {
    memorySize: 1024,
    timeout: Duration.seconds(5),
    runtime: Runtime.NODEJS_14_X,
    handler: "main",
    entry: join("functions/main.ts"),
    bundling: {
      minify: true,
      externalModules: ["aws-sdk"],
    },
  });
