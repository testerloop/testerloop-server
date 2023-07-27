# Testerloop Server

This is the backend repository for Testerloop. The frontend can be found [here](https://github.com/testerloop/testerloop-frontend). The backend is built using Node.js, TypeScript, and Apollo Server. It utilizes AWS S3 for storage and requires an AWS account and configured S3 buckets. It also uses [Prisma](https://www.prisma.io/docs) to interact with a postgres database.

This repo can be run locally for local development (instructions are included below), but it is not deployed as a standalone service. It is used as an NPM package by the [Testerloop App](https://github.com/testerloop/testerloop-app), which is deployed as our [staging site](www.otf.overloop.io) in an ECS cluster on AWS Fargate.

New versions of the backend package are published to NPM using [GitHub Actions](https://github.com/testerloop/testerloop-app/blob/master/.github/workflows/release-package.yml) when new releases are created on GitHub.

This repo can be run locally for local development (instructions are included below), but it is not deployed as a standalone service. It is used as an NPM package by the [Testerloop App](https://github.com/testerloop/testerloop-app), which is deployed as our [staging site](www.otf.overloop.io) in an ECS cluster on AWS Fargate.

New versions of the backend package are published to NPM using [GitHub Actions](https://github.com/testerloop/testerloop-app/blob/master/.github/workflows/release-package.yml) when new releases are created on GitHub.

## Prerequisites

Before getting started, make sure you have the following installed:

- [NVM](https://github.com/nvm-sh/nvm)
- [Node.js](https://nodejs.org/en/download/) (with v.18 set as the active version using NVM)
- [npm](https://www.npmjs.com/get-npm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

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

4. Update the .npmrc file replacing `<GITHUB_TOKEN>` with the token provided by the Testerloop team.

5. Install the dependencies:

```bash
npm install
```

### Update bash/zsh profile

If you have haven't already got a `credentials` file create one here:

    ~/.aws

and copy and paste this:

    [default]
    aws_access_key_id = YOUR_AWS_ACCESS_KEY_ID
    aws_secret_access_key = YOUR_AWS_SECRET_ACCESS_KEY
    aws_session_token =

In the same aws directory create a file called `config` and insert this:

    [default]
    region=eu-west-3
    output=json

In order to pull down npm packages from testerloop's private npm registry, create a new file at user root:

    touch ~/.npmrc 

and insert the following:

    @testerloop:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=[GITHUB_TOKEN]

If you do this, you don't need to create a separate .npmrc file for every repository.

## Build Database

Firstly you want to build and run the postgres docker image by running the following command. If you don't already have the postgres docker image, it will pull the image and build it for you, and then it will run it in detatch mode.

    docker-compose up -d

## Prisma ORM

The postgress db is accessed through the Prisma ORM. To make prisma aware of the data models, firstly you need to generate a prisma client:

    npx prisma generate

You can add the `--watch` flag to regenerate a new prisma client on changes to the schema.prisma file.

To view all Prisma cli commands you can visit [here](https://www.prisma.io/docs/reference/api-reference/command-reference).

## Apply Migrations

To view information about the state of current migrations:

    npx prisma migrate status

To apply prisma schemas to your local postgress, run the following command:

    npx prisma migrate dev

## Seed Database

To seed the database with some dummy data, run the following command:

``` bash
    npx ts-node-esm prisma/seed.ts
```

## View Tables

To view the tables where you can create and amend the data in your local postgres:

``` bash
    npx prisma studio
```

## Create a new table/model

You can create application models inside the schema.prisma file. Once done, run
`npx prisma migrate dev` to apply your schema changes to the db.

See [Prisma Data modelling](https://www.prisma.io/docs/concepts/overview/what-is-prisma/data-modeling) for more detail.

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

## Tests

To run all tests:

``` bash
    npm test
```

To run a specific test file:

```bash
    npm test -- generateSlug
```
