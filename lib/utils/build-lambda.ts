import { Stack } from "@aws-cdk/core";
import {
  NodejsFunctionProps,
  NodejsFunction,
} from "@aws-cdk/aws-lambda-nodejs";

export const buildLambda = (
  scope: Stack,
  id: string,
  params: NodejsFunctionProps
) => new NodejsFunction(scope, id, params);
