import { handlerPath } from "@libs/handlerResolver";
import { AWS } from "@serverless/typescript";
import {
  PIPELINES,
  REGION,
  SLACK_USERNAME,
  SLACK_USER_ICON,
  SLACK_WEBHOOK_URL,
  SUCCESS_MESSAGE,
  FAILURE_MESSAGE,
  SUCCESS_HEX_COLOR,
  FAILURE_HEX_COLOR,
} from "@config/config";

const eventDetails: Record<string, any> = {
  state: ["FAILED", "SUCCEEDED"],
};

if (PIPELINES) {
  eventDetails.pipeline = PIPELINES;
}

const functionConfig: AWS["functions"]["sender"] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description: "Send CodePipeline finish notifications to slack",
  events: [
    {
      cloudwatchEvent: {
        event: {
          source: ["aws.codepipeline"],
          "detail-type": ["CodePipeline Pipeline Execution State Change"],
          detail: eventDetails,
        },
      },
    },
  ],
  environment: {
    REGION,
    SLACK_USERNAME,
    SLACK_USER_ICON,
    SLACK_WEBHOOK_URL,
    SUCCESS_MESSAGE,
    FAILURE_MESSAGE,
    SUCCESS_HEX_COLOR,
    FAILURE_HEX_COLOR,
  },
};

export default functionConfig;
