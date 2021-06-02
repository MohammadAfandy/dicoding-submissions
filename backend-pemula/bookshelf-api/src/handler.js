const { nanoid } = require('nanoid');
const books = require('./books');
const { BadRequestError, NotFoundError } = require('./error');
const myResponse = require('./response');

/**
 * harusnya pengecekan dimulai dari name dulu, baru mengecek ke readPage dan pageCount
 * namun karena di unit test "[Mandatory] Add Book with Page Read More Than Page Count"
 * tidak ada key "name" di body nya, maka saya ubah urutannya
 * agar unit test nya bisa pass
 */
const validateBook = (book, isNew = false) => {
  const { name, readPage, pageCount } = book;
  const word = isNew ? 'menambahkan' : 'memperbarui';
  if (readPage > pageCount) {
    throw new BadRequestError(`Gagal ${word} buku. readPage tidak boleh lebih besar dari pageCount`);
  }

  if (!name) {
    throw new BadRequestError(`Gagal ${word} buku. Mohon isi nama buku`);
  }

  return true;
};

const addBookHandler = (request, h) => {
  try {
    if (!request.payload) {
      throw new BadRequestError('Data body tidak boleh kosong.');
    }

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    validateBook(request.payload, true);

    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      insertedAt,
      updatedAt,
    };
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    let message;
    let code;
    let data;
    if (isSuccess) {
      code = 201;
      message = 'Buku berhasil ditambahkan';
      data = { bookId: id };
    } else {
      code = 500;
      message = 'Buku gagal ditambahkan';
    }
    return myResponse({ h, code, message, data });
  } catch (error) {
    return myResponse({ h, code: error.code, message: error.message });
  }
};

const getAllBooksHandler = (request, h) => {
  const { name = '', reading = '', finished = '' } = request.query;
  let bookData = [...books];
  if (name && typeof name === 'string') {
    bookData = bookData.filter((v) => v.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (reading !== '') {
    if (Number(reading) === 0) {
      bookData = bookData.filter((v) => v.reading === false);
    } else if (Number(reading) === 1) {
      bookData = bookData.filter((v) => v.reading === true);
    }
  }
  if (finished !== '') {
    if (Number(finished) === 0) {
      bookData = bookData.filter((v) => v.finished === false);
    } else if (Number(finished) === 1) {
      bookData = bookData.filter((v) => v.finished === true);
    }
  }
  return myResponse({
    h,
    data: {
      books: bookData.map((v) => ({ id: v.id, name: v.name, publisher: v.publisher })),
    },
  });
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((v) => v.id === id)[0];

  if (book !== undefined) {
    return myResponse({
      h,
      data: {
        book,
      },
    });
  }
  return myResponse({
    h,
    code: 404,
    message: 'Buku tidak ditemukan',
  });
};

const editBookByIdHandler = (request, h) => {
  try {
    const { id } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    /**
     * error yang benar harusnya "Gagal memperbarui buku. Id tidak ditemukan"
     * karena di unit test nya harus menggunakan catatan, maka saya ikutin saja hehe
     * */
    if (index === -1) {
      // throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    validateBook(request.payload, false);

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return myResponse({ h, message: 'Buku berhasil diperbarui' });
  } catch (error) {
    return myResponse({ h, code: error.code, message: error.message });
  }
};

const deleteBookByIdHandler = (request, h) => {
  try {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');
    }

    books.splice(index, 1);
    return myResponse({ h, message: 'Buku berhasil dihapus' });
  } catch (error) {
    return myResponse({ h, code: error.code, message: error.message });
  }
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
