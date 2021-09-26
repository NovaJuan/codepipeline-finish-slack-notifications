import { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

export const REGION: AWS["provider"]["region"] = (process.env.REGION ||
  "sa-east-1") as AWS["provider"]["region"];

export const SLACK_USERNAME =
  process.env.SLACK_USERNAME || "CodePipeline Notifications";

export const SLACK_USER_ICON = process.env.SLACK_USER_ICON || ":robot_face:";

export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const SUCCESS_MESSAGE =
  process.env.SUCCESS_MESSAGE || "succeeded! => {{link}}}";

export const FAILURE_MESSAGE =
  process.env.FAILURE_MESSAGE || "failed! => {{link}}}";

export const SUCCESS_HEX_COLOR = `#${
  process.env.SUCCESS_HEX_COLOR || "009432"
}`;

export const FAILURE_HEX_COLOR = `#${
  process.env.FAILURE_HEX_COLOR || "EA2027"
}`;

export const PIPELINES: string[] | undefined = process.env.PIPELINES
  ? process.env.PIPELINES.split(",")
  : undefined;
