import * as serverlessExpress from "@vendia/serverless-express";
import { app } from "./app";

// NOTE:
// Not officially stated in Netlify's documentation,
// but it seems more-or-less compatible with AWS API Gateway Version 1.
// - https://docs.netlify.com/functions/build-with-javascript/
// - https://github.com/vendia/serverless-express/blob/mainline/src/event-sources/aws/api-gateway-v1.js

// @ts-ignore
export const handler = serverlessExpress({
  app,
  eventSourceName: "AWS_API_GATEWAY_V1",
});
