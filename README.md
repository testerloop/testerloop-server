# Testerloop Server

This is the backend repository for Testerloop. The frontend can be found [here](https://github.com/testerloop/testerloop-frontend). The backend is built using Node.js, TypeScript, and Apollo Server. It utilizes AWS S3 for storage and requires an AWS account and configured S3 buckets.

This repo can be run locally for local development (instructions are included below), but it is not deployed as a standalone service. It is used as an NPM package by the [Testerloop App](https://github.com/testerloop/testerloop-app), which is deployed as our [staging site](www.otf.overloop.io) in an ECS cluster on AWS Fargate.

New versions of the backend package are published to NPM using [GitHub Actions](https://github.com/testerloop/testerloop-app/blob/master/.github/workflows/release-package.yml) when new releases are created on GitHub.

## Prerequisites

Before getting started, make sure you have the following installed:

- [NVM](https://github.com/nvm-sh/nvm) 
- [Node.js](https://nodejs.org/en/download/) (with v.18 set as the active version using NVM)
- [npm](https://www.npmjs.com/get-npm)


## Setup

1. Clone the repository:

```bash
git clone git@github.com:testerloop/testerloop-server.git
cd testerloop-server
```

2. Copy the `.env.shadow` and `.npmrc.shadow` files to `.env` and `.npmrc`:

```bash
cp .env.shadow .env
cp .npmrc.shadow .npmrc
```

3. Update the .env file with your AWS credentials. If you don't have AWS credentials yet, you can obtain them by following [this guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html#access-keys-and-secret-access-keys).

```bash
PORT=8080

AWS_BUCKET_REGION=YOUR_AWS_BUCKET_REGION
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_BUCKET_NAME=YOUR_AWS_BUCKET_NAME
EXPIRES_IN=3600
```

4. Update the .npmrc file replacing `<GITHUB_TOKEN>` with the token provided by the Testerloop team.

5. Install the dependencies:

```bash
npm install
```

## Running

To start the backend in development mode, run:

```bash
npm run dev
```

This will start the backend server, and it will automatically reload when you make changes to the code.

## Building for production

To build the backend for production, run:

```bash
npm run build
```


