export const types = {
  general: `
    type Book {
      id: ID!
      title: String
      author: String
    }
  `,
  Query: `
    books: [Book]
    book(id: ID!): Book
  `,
  Mutation: `
    addBook(title: String, author: String): Book
    updateBook(id: ID!, title: String, author: String): Book
    removeBook(id: ID!): Boolean
  `
};

export const resolvers = {
  Query: {
    // @ts-ignore
    books: (parent, query, { dataSources: { booksApi } }) => booksApi.getBooks(),
    // @ts-ignore
    book: (parent, identifier, { dataSources: { booksApi } }) => booksApi.getBook(identifier.id),
  },
  Mutation: {
    // @ts-ignore
    addBook: (parent, details, { dataSources: { booksApi } }) => booksApi.addBook(details),
    // @ts-ignore
    updateBook: (parent, book, { dataSources: { booksApi } }) => booksApi.updateBook(book),
    // @ts-ignore
    removeBook: (parent, identifier, { dataSources: { booksApi } }) => booksApi.removeBook(identifier.id),
  },
};

export const books = {
  types,
  resolvers,
};

export default books;
