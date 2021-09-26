import type { CodePipelineCloudWatchActionEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/formatters";
import { middyfy } from "@libs/lambda";
import axios from "axios";

const sender = async (event: CodePipelineCloudWatchActionEvent) => {
  const {
    SLACK_USERNAME,
    SLACK_USER_ICON,
    SLACK_WEBHOOK_URL,
    REGION,
    SUCCESS_MESSAGE,
    FAILURE_MESSAGE,
    SUCCESS_HEX_COLOR,
    FAILURE_HEX_COLOR,
  } = process.env;

  const { pipeline, state } = event.detail;

  const message =
    state === "SUCCEEDED" ? `${SUCCESS_MESSAGE}` : `${FAILURE_MESSAGE}`;

  const link = `<https://${REGION}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${pipeline}/view?region=${REGION}|${pipeline}>`;

  await axios.post(SLACK_WEBHOOK_URL, {
    username: SLACK_USERNAME,
    icon_emoji: SLACK_USER_ICON,
    attachments: [
      {
        color: state === "SUCCEEDED" ? SUCCESS_HEX_COLOR : FAILURE_HEX_COLOR,
        text: message.replace("{{link}}", link),
      },
    ],
  });

  return formatJSONResponse({
    event,
  });
};

export const main = middyfy(sender);
