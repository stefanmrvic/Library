import '../styles/style.scss';

const myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(event) {
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    
    const newBook = new Book(name, author, pages, read);
    
    // Put if statement that checks if the book already exists, to prevent duplicates
    myLibrary.push(newBook);
    event.preventDefault();
}

const addBookBtn = document.querySelector('.add-book-btn');

addBookBtn.addEventListener('click', () => {
    const dialog = document.querySelector('.dialog');
    dialog.showModal();
});

const form = document.querySelector('.form');
form.addEventListener('submit', addBookToLibrary);


// const test = new Book('Prvi put rokamo', 'Mrki', 235, 'procitaoo');

// console.log(test);

//console.log(myLibrary);

