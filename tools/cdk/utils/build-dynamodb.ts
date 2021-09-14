import { Stack } from "@aws-cdk/core";
import { TableProps, Table } from "@aws-cdk/aws-dynamodb";

export const buildDynamodb = (scope: Stack, id: string, params: TableProps) =>
  new Table(scope, id, params);
