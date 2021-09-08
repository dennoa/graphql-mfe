"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
/**
 * Similar to the route handling of a REST API server, the top level mappings here just delegate to other handlers
 */
const handlers_1 = require("../handlers");
exports.resolvers = {
    Query: {
        books: () => handlers_1.bookHandler.getBooks(),
    },
    Mutation: {
        createBook: (parent, details) => handlers_1.bookHandler.createBook(details),
        updateBook: (parent, book) => handlers_1.bookHandler.updateBook(book),
        removeBook: (parent, identifier) => handlers_1.bookHandler.removeBook(identifier.id),
    }
};
exports.default = exports.resolvers;
