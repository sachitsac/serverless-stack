import { buildDynamodb } from "../utils/build-dynamodb";
import { Stack } from "@aws-cdk/core";
import { AttributeType, BillingMode } from "@aws-cdk/aws-dynamodb";

export const dynamodb = (scope: Stack, tableName: string) =>
  buildDynamodb(scope, tableName, {
    billingMode: BillingMode.PAY_PER_REQUEST,
    partitionKey: {
      name: "id",
      type: AttributeType.STRING,
    },
  });
