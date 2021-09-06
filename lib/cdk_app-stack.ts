import { cfnLog } from "./utils/cfnLog";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { AuthorizationType, GraphqlApi, Schema } from "@aws-cdk/aws-appsync";
import { join } from "path";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new GraphqlApi(this, "Api", {
      name: "hello-world",
      schema: Schema.fromAsset(join(__dirname, "schema.graphql")),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    cfnLog(this, "GraphqlApiUrl", api.graphqlUrl);
    cfnLog(this, "GraphqlApiKey", api.apiKey || "");
    cfnLog(this, "Stack Region", this.region);

    // lib/appsync-cdk-app-stack.ts
    const notesLambda = new Function(this, "AppSyncNotesHandler", {
      runtime: Runtime.NODEJS_12_X,
      handler: "main.handler",
      code: Code.fromAsset("functions"),
      memorySize: 1024,
    });

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", notesLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "greet",
    });
  }
}
