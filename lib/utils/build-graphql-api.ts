import { GraphqlApi, GraphqlApiProps } from "@aws-cdk/aws-appsync";
import { Stack } from "@aws-cdk/core";

export const buildGraphqlApi = (
  scope: Stack,
  id: string,
  props: GraphqlApiProps
): GraphqlApi => new GraphqlApi(scope, id, { ...props });
