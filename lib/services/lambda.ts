import { Runtime } from "@aws-cdk/aws-lambda";
import { Duration, Stack } from "@aws-cdk/core";
import { buildLambda } from "../utils/build-lambda";

export const lambda = (stack: Stack, handler: string, entry: string) =>
  buildLambda(stack, `${handler}Handler`, {
    memorySize: 1024,
    timeout: Duration.seconds(5),
    runtime: Runtime.NODEJS_14_X,
    handler,
    entry,
    bundling: {
      minify: true,
      externalModules: ["aws-sdk"],
    },
  });
