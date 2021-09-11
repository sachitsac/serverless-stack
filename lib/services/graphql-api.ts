import { Stack } from "@aws-cdk/core";
import { AuthorizationType, Schema } from "@aws-cdk/aws-appsync";
import { buildGraphqlApi } from "../utils/build-graphql-api";
import { join } from "path";

export const graphqlApi = (scope: Stack) => {
  return buildGraphqlApi(scope, "Api", {
    name: "GraphqlApi",
    schema: Schema.fromAsset(
      join(__dirname, "../../plugins/chats/graphql/schema.graphql")
    ),
    authorizationConfig: {
      defaultAuthorization: {
        authorizationType: AuthorizationType.API_KEY,
      },
    },
    xrayEnabled: true,
  });
};
