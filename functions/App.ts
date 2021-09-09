import { GraphqlApi } from "@aws-cdk/aws-appsync";
import { Stack } from "@aws-cdk/core";

export interface App {
  name: string;
  port: number;
  stack: Stack;
}

export interface GraphqlApiStack extends Stack {
  api: GraphqlApi;
}
