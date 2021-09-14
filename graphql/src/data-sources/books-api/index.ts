// This would normally be interacting with some backend
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

interface BookDetails {
  title: string;
  author: string;
}

interface Book extends BookDetails {
  id: string;
}

const getBooks = async (): Promise<Book[]> => books;

const getBook = async (id: string): Promise<Book|undefined> => books.find(b => b.id === id);

async function addBook(details: BookDetails): Promise<Book> {
  const id = books.reduce((nextId, b) => `${Math.max(+nextId, +b.id + 1)}`, '0');
  const book = { id, ...details };
  books.push(book);
  return book;
}

async function updateBook(updates: Book): Promise<Book|undefined> {
  const book = await getBook(updates.id);
  if (book) {
    const keys = Object.keys(updates) as (keyof Book)[];
    for (let key of keys) {
      book[key] = updates[key]
    }
    return book;
  }
  return undefined;
}

async function removeBook(id: string): Promise<boolean> {
  const idx = books.findIndex(b => b.id === id);
  const found = (idx >= 0);
  if (found) {
    books.splice(idx, 1);
  }
  return found;
}

const booksApi = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  removeBook,
};

export default booksApi;
