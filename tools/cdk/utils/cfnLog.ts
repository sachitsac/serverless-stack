import { CfnOutput, Stack } from "@aws-cdk/core";

export const cfnLog = (stack: Stack, key: string, value: string) => {
  new CfnOutput(stack, key, {
    value: value,
  });
};
