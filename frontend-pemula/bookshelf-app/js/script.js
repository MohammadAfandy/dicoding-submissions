document.addEventListener("DOMContentLoaded", () => {
  const inputBookIsCompleteCheckbox = document.getElementById("inputBookIsComplete");
  inputBookIsCompleteCheckbox.addEventListener("change", (event) => {
    const bookSubmitButton = document.getElementById("bookSubmit");
    if (event.target.checked) {
      bookSubmitButton.querySelector('span').innerText = "Selesai dibaca";
    } else {
      bookSubmitButton.querySelector('span').innerText = "Belum selesai dibaca";
    }
  });

  const formInputBook = document.getElementById("inputBook");
  formInputBook.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  const formSearchBook = document.getElementById("searchBook");
  formSearchBook.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) loadDataFromStorage();
});

document.addEventListener("ondatasaved", () => {
  showLoading();
});

document.addEventListener("ondataloaded", () => {
  refreshDataBook();
});
