import { cfnLog } from "./utils/cfnLog";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { graphqlApi } from "./services/graphql-api";
import { lambda } from "./services/lambda";

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = graphqlApi(this);
    const func = lambda(this);

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", func);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "greet",
    });

    cfnLog(this, "GraphqlApiUrl", api.graphqlUrl);
    cfnLog(this, "GraphqlApiKey", api.apiKey || "");
    cfnLog(this, "Stack Region", this.region);
  }
}
