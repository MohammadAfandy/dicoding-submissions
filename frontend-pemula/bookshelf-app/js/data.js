const STORAGE_KEY = "BOOKSHELF_APP";

let books = [];

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);
  if (data !== null) books = data;
  document.dispatchEvent(new Event("ondataloaded"));
};

const composeBookObject = ({ title, author, year, isComplete }) => {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
};

const isStorageExist = ()=> {
  if (typeof(Storage) === undefined){
      alert("Browser kamu tidak mendukung local storage");
      return false
  } 
  return true;
};

const updateDataToStorage = () => {
  if (isStorageExist()) saveData();
};

const saveData = () => {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
};

const findBook = (bookId) => {
  return books.find((book) => book.id === bookId);
};

const findBookIndex = (bookId) => {
  return books.findIndex((book) => book.id === bookId);
};
