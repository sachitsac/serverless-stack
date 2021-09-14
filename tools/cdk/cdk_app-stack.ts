import { dynamodb } from "./services/dynamodb";
import { cfnLog } from "./utils/cfnLog";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { graphqlApi } from "./services/graphql-api";
import { addResolver } from "./utils/add-resolver";

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = dynamodb(this, "chats");
    const api = graphqlApi(this);

    addResolver(api, {
      stack: this,
      name: "addChatMessage",
      entry: "../../plugins/chats/src/addChatMessage.ts",
      table: table,
      type: "Mutation",
    });

    addResolver(api, {
      stack: this,
      name: "messages",
      entry: "../../plugins/chats/src/messages.ts",
      table: table,
      type: "Query",
    });

    cfnLog(this, "GraphqlApiUrl", api.graphqlUrl);
    cfnLog(this, "GraphqlApiKey", api.apiKey || "");
    cfnLog(this, "Stack Region", this.region);
  }
}
