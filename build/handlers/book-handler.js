"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookHandler = exports.removeBook = exports.updateBook = exports.createBook = exports.getBooks = void 0;
// These handlers would normally be interacting with backend APIs
const books = [
    {
        id: '1',
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        id: '2',
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const getBooks = () => books;
exports.getBooks = getBooks;
function createBook(details) {
    const id = books.reduce((nextId, b) => `${Math.max(+nextId, +b.id + 1)}`, '0');
    const book = Object.assign({ id }, details);
    books.push(book);
    return book;
}
exports.createBook = createBook;
function updateBook(updates) {
    const book = books.find(b => b.id === updates.id);
    if (book) {
        const keys = Object.keys(updates);
        for (let key of keys) {
            book[key] = updates[key];
        }
        return book;
    }
    return null;
}
exports.updateBook = updateBook;
function removeBook(id) {
    const idx = books.findIndex(b => b.id === id);
    const found = (idx >= 0);
    if (found) {
        books.splice(idx, 1);
    }
    return found;
}
exports.removeBook = removeBook;
exports.bookHandler = {
    getBooks: exports.getBooks,
    createBook,
    updateBook,
    removeBook,
};
exports.default = exports.bookHandler;
