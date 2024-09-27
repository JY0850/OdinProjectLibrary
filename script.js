// Library (Project) - Odin Project

let bookCounter = 1;

// Book Constructor
function Book(name, author, read) {
  this.name = name;
  this.author = author;
  this.read = read;
  this.id = `book${bookCounter++}`;
}

// Default Books for Testing
const theHobbit = new Book("The Hobbit", "J.R.R", false);
const harryPotter = new Book(
  "Harry Potter and the Philosopher's Stone",
  "J.K. Rowling",
  true
);
const atomicHabits = new Book("Atomic Habits", "James Clear", true);
const haeseMaths = new Book(
  "Mathematics: Analysis and Approaches HL",
  "Michael Haese",
  true
);

// Library Array
const myLibrary = [theHobbit, harryPotter, atomicHabits, haeseMaths];
// const myLibrary = [];

// Show/Close Dialog
const dialog = document.querySelector("#newBookDialog");
const showButton = document.querySelector("#newBook");
const closeButton = document.querySelector("#closeDialog");

// Books Container
const booksContainer = document.querySelector("#books");
const bookName = document.querySelector("#name");
const bookAuthor = document.querySelector("#author");
const bookRead = document.querySelector("#read");
const submitButton = document.querySelector("#submitDialog");

function displayBooks(library) {
  booksContainer.innerHTML = "";

  if (library.length == 0) {
    const noBooks = document.createElement("p");
    noBooks.textContent = "No books added! 👻";
    booksContainer.appendChild(noBooks);
  } else {
    for (let i = 0; i < library.length; i++) {
      const book = library[i];
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book"); // Adding "book" class
      bookDiv.id = book.id;

      const bookTitle = document.createElement("h2");
      bookTitle.textContent = book.name; // <h1> {book.name} </h1>
      bookDiv.appendChild(bookTitle);

      const bookAuthor = document.createElement("h3");
      bookAuthor.textContent = "Author: " + book.author; // <p> Author: {book.name} </p>
      bookDiv.appendChild(bookAuthor);

      const bookRead = document.createElement("p");
      if (!book.read) {
        bookRead.textContent = "Status: Not read ❌";
      } else {
        bookRead.textContent = "Status: Read ✅";
      }
      bookDiv.appendChild(bookRead);

      // Delete/Read Buttons
      const buttonsDiv = document.createElement("div");
      buttonsDiv.id = "bookButtons";

      const deleteButton = document.createElement("button");
      const readButton = document.createElement("button");
      deleteButton.textContent = "Delete Book";
      readButton.textContent = "Read?";

      deleteButton.addEventListener("click", () => {
        deleteBook(book);
      });

      readButton.addEventListener("click", () => {
        readBook(book);
      });

      buttonsDiv.appendChild(deleteButton);
      buttonsDiv.appendChild(readButton);

      bookDiv.appendChild(buttonsDiv);
      booksContainer.appendChild(bookDiv);
    }
  }
}

function deleteBook(book) {
  const index = myLibrary.indexOf(book);
  if (index > -1) {
    myLibrary.splice(index, 1);
    
    const bookDiv = document.querySelector(`#${book.id}`);
    if (bookDiv) {
      bookDiv.remove();
    } else {
      console.error('Error: Book div not found.');
    }
  } else {
    console.error('Error: Book not found in the library.');
  }
  displayBooks(myLibrary);
}

function readBook(book) {
  if (!book.read){
    book.read = true;
  } else {
    book.read = false;
  }
  displayBooks(myLibrary);
}

showButton.addEventListener("click", () => {
  dialog.style.display = "flex";
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.style.display = "none";
  dialog.close();
});

submitButton.addEventListener("click", () => {
  const newBook = new Book(bookName.value, bookAuthor.value, bookRead.checked);
  myLibrary.push(newBook);
  dialog.style.display = "none";
  dialog.close();
  displayBooks(myLibrary);
});

displayBooks(myLibrary);