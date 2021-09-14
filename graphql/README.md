# GraphQL Server

This is using `apollo-server-express` middleware so the same server can be used to serve static content for the front-end as well as handling graphql requests. The graphql server is accessible via `/graphql`.

Refer to the apollo docs here: <https://www.apollographql.com/docs/apollo-server/integrations/middleware/>.

This project uses typescript. It would be nice to use typescript for the graphql schema types, but this is problemmatic. There is a an attempt to address this with TypeGraphQL: <https://typegraphql.com/>. It uses experimental typescript decorators and provides a function to generate a GraphQL schema from the typescript annotations. I looked into it but felt it was a bit heavy and difficult to get working (i.e. I never actually got it to work!).

Instead of TypeGraphQL, this project simply follows a modular approach that delegates responsibility for both the typescript definitions and the GraphQL types to each of the modules. GraphQL types from each module are combined into a single set of type definitions for the Apollo Server.

## Project Structure

* `/src/index.ts` is the main entry point.
* `/src/server.ts` pulls everything together and starts the server.
* `/src/config.ts` exposes the environment variables. Use a local `.env` file or set the environment variables however you like. See `/.env.example` for the relevant variable names.
* `'/src/logger` is a simple logger.
* `/src/schema` contains the combined set of type definitions and resolvers that are provided to the Apollo Server.
* `/src/models` breaks down the solution into its logical parts. Each model defines the types and resolvers specific to its scope. A model may source its data from one or more `data-sources`.
* `/src/data-sources` provides connectivity to the data - normally via a backend API. All data sources are provided to the Apollo Server on startup, which subsequently makes them available to each `resolver` via the `context` parameter.

## Getting Started

1. `npm i`
1. `cp .env.example .env`
1. Set your specific `.env` variables. The non-prod instances of the SVx API use TLS. Since this accesses the API via an internal trusted network, you can bypass the usual checks with `NODE_TLS_REJECT_UNAUTHORIZED=0` if you like.
1. `npm run dev` to run the server in developer mode (watching for code changes)
1. `npm run build` to build
1. `npm start` to run the server using the build artefacts
