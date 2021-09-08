"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const schema_1 = require("./schema");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // TODO: Configure express middleware (e.g. serve static, cors if required, etc.)
        const httpServer = http_1.default.createServer(app);
        const plugins = [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })];
        const server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers, plugins });
        yield server.start(); // Must await server start before applying middleware
        server.applyMiddleware({
            app,
            path: '/graphql', // host from /graphql to allow serving other resources
        });
        yield new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
exports.startServer = startServer;
