import { dynamodb } from "./services/dynamodb";
import { cfnLog } from "./utils/cfnLog";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { graphqlApi } from "./services/graphql-api";
import { lambda } from "./services/lambda";

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = graphqlApi(this);
    const addChatMessageResolver = lambda(
      this,
      "addChatMessage",
      "functions/addChatMessage.ts"
    );

    const chatTable = dynamodb(this, "chats");

    chatTable.grantFullAccess(addChatMessageResolver);

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource(
      "lambdaDatasource",
      addChatMessageResolver
    );
    addChatMessageResolver.addEnvironment("CHAT_TABLE", chatTable.tableName);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "greet",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addChatMessage",
    });

    cfnLog(this, "GraphqlApiUrl", api.graphqlUrl);
    cfnLog(this, "GraphqlApiKey", api.apiKey || "");
    cfnLog(this, "Stack Region", this.region);
  }
}
