# Serverless Stack

THe main goal of this project is to enable modular domain bounded services using
aws serverless stack.

# Prerequisite

- AWS cli installed
- AWS account configured locally

## Useful commands

```
# if you modify the schema, run this command to generate types
npm run codegen

# To test if the stack is ok, run this command
npx cdk synth

# To deploy this stack
npm run deploy

```

## Goals

- Build small domain specific graphql microservices
- Each service can register their stack with the main stack
- Services will only be able to extend the stack and not modify it
- Each service will as a minimum have the following:
  - Graphql Api
  - Data source ( dynamodb or aurora )
  - Lambda resolver ( nodejs lambda resolver )

## Todos

- [ ] Github action to build and deploy the stack in different environments
- [ ] Refactor the code into modules / services
- [ ] Create an interface for the services
- [ ] Use dependency injection to register services so the main stack can deploy them

... more to come
