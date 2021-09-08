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

export interface BookDetails {
  title: string;
  author: string;
}

export interface Book extends BookDetails {
  id: string;
}

export const getBooks = () => books;

export function createBook(details: BookDetails): Book {
  const id = books.reduce((nextId, b) => `${Math.max(+nextId, +b.id + 1)}`, '0');
  const book = { id, ...details };
  books.push(book);
  return book;
}

export function updateBook(updates: Book): Book|null {
  const book = books.find(b => b.id === updates.id);
  if (book) {
    const keys = Object.keys(updates);
    for (let key of keys) {
      book[key] = updates[key]
    }
    return book;
  }
  return null;
}

export function removeBook(id: string): boolean {
  const idx = books.findIndex(b => b.id === id);
  const found = (idx >= 0);
  if (found) {
    books.splice(idx, 1);
  }
  return found;
}

export const bookHandler = {
  getBooks,
  createBook,
  updateBook,
  removeBook,
};

export default bookHandler;
