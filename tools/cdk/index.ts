#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { CdkAppStack } from "./cdk_app-stack";

const app = new App();
new CdkAppStack(app, "CdkAppStack", {
  stackName: process.env.STACK_NAME ?? "DevAppStack",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
