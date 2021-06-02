const INCOMPLETED_BOOKS_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOKS_LIST_ID = "completeBookshelfList";
const BOOK_ID = "bookId";
const SEARCH_BOOK_TITLE_ID = "searchBookTitle";

const addBook = () => {
  const incompletedBookListId = document.getElementById(INCOMPLETED_BOOKS_LIST_ID);
  const completedBookListId = document.getElementById(COMPLETED_BOOKS_LIST_ID);

  const titleElement = document.getElementById("inputBookTitle");
  const authorElement = document.getElementById("inputBookAuthor");
  const yearElement = document.getElementById("inputBookYear");
  const isCompleteElement = document.getElementById("inputBookIsComplete");

  const title = titleElement.value;
  const author = authorElement.value;
  const year = yearElement.value;
  const isComplete = isCompleteElement.checked;

  const book = makeBook({ title, author, year, isComplete });
  styleNewBook(book);
  const bookObject = composeBookObject({ title, author, year, isComplete });
  
  book[BOOK_ID] = bookObject.id;
  books.push(bookObject);

  if (isComplete) {
    completedBookListId.append(book);
  } else {
    incompletedBookListId.append(book);
  }

  // empty form input
  titleElement.value = "";
  authorElement.value = "";
  yearElement.value = "";
  isCompleteElement.checked = false;
  isCompleteElement.dispatchEvent(new Event('change'));

  scrollTo(book);

  updateDataToStorage();
};

const makeBook = ({ title, author, year, isComplete }) => {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerHTML = `Penulis: <span>${author}</span>`;
  
  const textYear = document.createElement("p");
  textYear.innerHTML = `Tahun: <span>${year}</span>`;

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(textTitle, textAuthor, textYear);

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  actionContainer.append(isComplete ? createIncompleteReadButton() : createCompleteReadButton());
  actionContainer.append(createDeleteButton());

  container.append(actionContainer);

  return container;
};

const createButton = (buttonText, buttonTypeClass, eventListener) => {
  const button = document.createElement("button");
  button.classList.add(...buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener("click", (event) => {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
};

const createIncompleteReadButton = () => {
  return createButton("Belum selesai dibaca", ["incomplete-read-button", "green"], (event) => {
    moveToInCompletedBookList(event.target.parentElement.closest('article'));
  });
};

const createCompleteReadButton = () => {
  return createButton("Selesai dibaca", ["complete-read-button", "green"], (event) => {
    moveToCompletedBookList(event.target.parentElement.closest('article'));
  });
};

const createDeleteButton = () => {
  return createButton("Hapus Buku", ["delete-button", "red"], (event) => {
    const parentElement = event.target.parentElement.closest('article');
    const title = parentElement.querySelector("h3").innerText;
    if (confirm(`Apakah anda yakin ingin menghapus buku ${title} ?`)) {
      removeBook(parentElement);
    }
  });
};

const moveToCompletedBookList = (bookElement) => {
  const completedBookListId = document.getElementById(COMPLETED_BOOKS_LIST_ID);

  const title = bookElement.querySelector("h3").innerText;
  const author = bookElement.querySelectorAll("p > span")[0].innerText;
  const year = bookElement.querySelectorAll("p > span")[1].innerText;
  const isComplete = true;

  const newBook = makeBook({ title, author, year, isComplete });

  const book = findBook(bookElement[BOOK_ID]);
  book.isComplete = true;
  newBook[BOOK_ID] = book.id;

  completedBookListId.append(newBook);
  bookElement.remove();

  styleNewBook(newBook);
  scrollTo(newBook);
  updateDataToStorage();
};

const moveToInCompletedBookList = (bookElement) => {
  const inCompletedBookListId = document.getElementById(INCOMPLETED_BOOKS_LIST_ID);

  const title = bookElement.querySelector("h3").innerText;
  const author = bookElement.querySelectorAll("p > span")[0].innerText;
  const year = bookElement.querySelectorAll("p > span")[1].innerText;
  const isComplete = false;

  const newBook = makeBook({ title, author, year, isComplete });

  const book = findBook(bookElement[BOOK_ID]);
  book.isComplete = false;
  newBook[BOOK_ID] = book.id;

  inCompletedBookListId.append(newBook);
  bookElement.remove();

  styleNewBook(newBook);
  scrollTo(newBook);
  updateDataToStorage();
};

const removeBook = (bookElement) => {
  const bookIndex = findBookIndex(bookElement[BOOK_ID]);
  books.splice(bookIndex, 1);
  bookElement.remove();
  updateDataToStorage();
};

const refreshDataBook = () => {
  const incompletedBookListId = document.getElementById(INCOMPLETED_BOOKS_LIST_ID);
  const completedBookListId = document.getElementById(COMPLETED_BOOKS_LIST_ID);

  books.forEach((book) => {
    const newBook = makeBook(book);
    newBook[BOOK_ID] = book.id;

    if (book.isComplete) {
      completedBookListId.append(newBook);
    } else {
      incompletedBookListId.append(newBook);
    }
  });
};

const searchBook = () => {
  showLoading();
  const incompletedBookListId = document.getElementById(INCOMPLETED_BOOKS_LIST_ID);
  const completedBookListId = document.getElementById(COMPLETED_BOOKS_LIST_ID);
  const searchBookTitle = document.getElementById(SEARCH_BOOK_TITLE_ID);

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchBookTitle.value.toLowerCase());
  });

  completedBookListId.innerHTML = '';
  incompletedBookListId.innerHTML = '';

  filteredBooks.forEach((book) => {
    const newBook = makeBook(book);
    newBook[BOOK_ID] = book.id;

    if (book.isComplete) {
      completedBookListId.append(newBook);
    } else {
      incompletedBookListId.append(newBook);
    }
  })
};

const styleNewBook = (newBook) => {
  const bookItems = document.getElementsByClassName('book_item');
  [...bookItems].forEach((bookItem) => {
    bookItem.classList.remove("new");
  });
  newBook.classList.add("new");
};

const scrollTo = (element) => {
  element.scrollIntoView({ behavior: 'smooth' });
};

const showLoading = () => {
  const mainElement = document.querySelector("main");
  const loaderElement = document.querySelector("#loader");
  mainElement.classList.add("onLoading");
  loaderElement.style.display = "block";
  setTimeout(() => {
    mainElement.classList.remove("onLoading");  
    loaderElement.style.display = "none";
  }, 500);
};