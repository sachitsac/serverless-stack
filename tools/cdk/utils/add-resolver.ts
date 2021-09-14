import { GraphqlApi } from "@aws-cdk/aws-appsync";
import { Table } from "@aws-cdk/aws-dynamodb";
import { Stack } from "@aws-cdk/core";
import { lambda } from "../services/lambda";

export interface ResolverProps {
  stack: Stack;
  name: string;
  entry: string;
  type: "Query" | "Mutation" | "Subscription";
  table?: Table;
}

export const addResolver = (
  api: GraphqlApi,
  { stack, name, entry, table, type }: ResolverProps
): void => {
  const resolver = lambda(stack, name, entry);

  if (table) {
    resolver.addEnvironment("TABLE_NAME", table.tableName);
    if (type === "Mutation") {
      table.grantWriteData(resolver);
    }

    if (type === "Query") {
      table.grantReadData(resolver);
    }
  }

  const ds = api.addLambdaDataSource(`${name}Resolver`, resolver);
  ds.createResolver({
    typeName: type,
    fieldName: name,
  });
};
