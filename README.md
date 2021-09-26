# CodePipeline finish notifications for Slack

## Requirements
- NodeJS
- Yarn (optional, but recommended)
- AWS IAM user with keys for serverless credentials
- A Slack Webhook URL from Incoming Webhooks apps

## Instructions

1. Install dependencies
```
yarn install
```

2. Config serverless credentials (only if you didn't do it before)
```
yarn serverless --provider aws --key <your-access-key> --secret <your-secret-key> --profile <your-iam-user-profile>
```

3. Copy the `.env.example` file and create a new one called `.env`

4. Set your variables in the .env file

5. Run `yarn deploy` and that's it. Shouldn't be any problem :) ...
