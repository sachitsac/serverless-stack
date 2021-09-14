import { dynamodb } from "./services/dynamodb";
import { cfnLog } from "./utils/cfnLog";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { graphqlApi } from "./services/graphql-api";
import { lambda } from "./services/lambda";

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const chatTable = dynamodb(this, "chats");
    const api = graphqlApi(this);

    const addChatMessageResolver = lambda(
      this,
      "addChatMessage",
      "../../plugins/chats/src/addChatMessage.ts"
    );
    addChatMessageResolver.addEnvironment("CHAT_TABLE", chatTable.tableName);
    chatTable.grantWriteData(addChatMessageResolver);

    // Set the new Lambda function as a data source for the AppSync API
    const addChatMessageDs = api.addLambdaDataSource(
      "addChatMessageResolver",
      addChatMessageResolver
    );

    addChatMessageDs.createResolver({
      typeName: "Mutation",
      fieldName: "addChatMessage",
    });

    const readChatsResolver = lambda(
      this,
      "messages",
      "../../plugins/chats/src/messages.ts"
    );
    readChatsResolver.addEnvironment("CHAT_TABLE", chatTable.tableName);
    chatTable.grantReadData(readChatsResolver);

    // Set the new Lambda function as a data source for the AppSync API
    const messageDs = api.addLambdaDataSource(
      "readChatsResolver",
      readChatsResolver
    );

    messageDs.createResolver({
      typeName: "Query",
      fieldName: "messages",
    });

    cfnLog(this, "GraphqlApiUrl", api.graphqlUrl);
    cfnLog(this, "GraphqlApiKey", api.apiKey || "");
    cfnLog(this, "Stack Region", this.region);
  }
}
