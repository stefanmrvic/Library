import '../styles/style.scss';

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
    
    toggleObjectReadStatus() {
        this.read = this.read ? false : true;
    }
    
}

const testObj1 = new Book('Na livadi divnoj', 'Lepi Stevdza', 304, false);
const testObj2 = new Book('Pevaj Goblube', 'Dzigi', 124, true);
const testObj3 = new Book('Ko to tamo stenje', 'Savo Dzigljavi', 324, true);

const myLibrary = [];
myLibrary.push(testObj1, testObj2, testObj3);

function toggleReadStatus(event) {
    const li = event.target.closest('.library__item');
    const button = event.target.closest('button.library__item__read-btn');

    if (!li || !button) return;

    const liID = li.getAttribute('data-id');
    const readPara = li.querySelector('.library__item__read');
    const book = myLibrary.find((book) => book.id === liID);

    if (!book || !readPara) return; 

    book.toggleObjectReadStatus();
    readPara.textContent = book.read ? "I have read the book." : "I haven't read the book yet.";
}

function addBookToLibrary(event) {
    event.preventDefault();

    const title = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value.trim();
    const read = document.getElementById('read').checked;

    const duplicate = myLibrary.find((book) => book.title === title && book.author === author);

    if (duplicate) {
        alert(`The book already exists!\n         (you donkey)`);
        return;
    }
    
    const newBook = new Book(title, author, pages, read);
    
    myLibrary.push(newBook);
    addElement(newBook);
    form.reset();
}

function addElement(book) {
    const parentContainer = document.querySelector('.library');

    const newLI = document.createElement('li');
    newLI.classList.add('library__item');
    newLI.setAttribute('data-id', book.id);

    const newReadBtn = document.createElement('button');
    newReadBtn.textContent = `📖`;
    newReadBtn.classList.add('library__item__read-btn');

    const newCloseBtn = document.createElement('button');
    newCloseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18v2H3V6zm2 3h14v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9zm3 2v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2z"/>
        </svg>
    `;
    newCloseBtn.classList.add('library__item__delete-btn');

    const newTitle = document.createElement('h2');
    newTitle.textContent = book.title;
    newTitle.classList.add('library__item__title');

    const newAuthor = document.createElement('p');
    newAuthor.textContent = book.author;
    newAuthor.classList.add('library__item__author');

    const newPages = document.createElement('p');
    newPages.textContent = book.pages;
    newPages.classList.add('library__item__pages')

    const newRead = document.createElement('p');
    newRead.textContent = book.read ? "I have read the book." : "I haven't read the book yet.";
    newRead.classList.add('library__item__read');

    parentContainer.append(newLI);
    newLI.append(newReadBtn, newCloseBtn, newTitle, newAuthor, newPages, newRead);
}

// === DOM SELECTORS === //
const addBookBtn = document.querySelector('.add-book-btn');
const closeBtn = document.querySelector('.close-btn');
const dialog = document.querySelector('.dialog');
const form = document.querySelector('.form');
const libraryContainer = document.querySelector('.library');

// === EVENT BINDINGS === //
addBookBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close());
form.addEventListener('submit', addBookToLibrary);
libraryContainer.addEventListener('click', deleteElement);
libraryContainer.addEventListener('click', toggleReadStatus);

function deleteElement(event) { 
    const liElement = event.target.closest('.library__item');
    const button = event.target.closest('.library__item__delete-btn');
    
    if (!liElement || !button) return;

    const liElementID = liElement.dataset.id;

    // Checks if the desired element for deletion exists in the myLibrary array & gets its index 
    const index = myLibrary.findIndex((book) => book.id === liElementID);

    if (index !== -1) {
        myLibrary.splice(index, 1);
        liElement.remove();
    } else {
        throw new Error('Element not found in an array!');
    }
}

function renderLibrary() {
    const bookElements = [...document.querySelectorAll('.library__item')];
    const domIDs = bookElements.map((book) => book.dataset.id);
    
    for (const obj of myLibrary) {
        if (!obj.id) {
            throw new Error(`Element in an array doesn't have an ID!`);
        }

        if (!domIDs.includes(obj.id)) {
            addElement(obj);
        }
    }
}

renderLibrary();