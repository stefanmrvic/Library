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
    
    myLibrary.push(newBook);
    
    addElement(name, author, pages, read, newBook.id);

    event.preventDefault();
}

function addElement(name, author, pages, read, id) {
    const parentContainer = document.querySelector('.library');

    const newLI = document.createElement('li');
    newLI.classList.add('library__item');
    newLI.setAttribute('data-id', id);

    const newBtn = document.createElement('button');
    newBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18v2H3V6zm2 3h14v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9zm3 2v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2z"/>
        </svg>
    `;
    newBtn.classList.add('library__item__close-btn');

    const newH2 = document.createElement('h2');
    newH2.textContent = name;
    newH2.classList.add('library__item__title');

    const newPara1 = document.createElement('p');
    newPara1.textContent = author;
    newPara1.classList.add('library__item__author');

    const newPara2 = document.createElement('p');
    newPara2.textContent = pages;
    newPara2.classList.add('library__item__pages')

    const newPara3 = document.createElement('p');
    newPara3.textContent = read;
    newPara3.classList.add('library__item__read');

    parentContainer.append(newLI);
    newLI.append(newBtn, newH2, newPara1, newPara2, newPara3);
}

const addBookBtn = document.querySelector('.add-book-btn');
const closeBtn = document.querySelector('.close-btn');

addBookBtn.addEventListener('click', () => {
    const dialog = document.querySelector('.dialog');
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    const dialog = document.querySelector('.dialog');
    dialog.close();
});

const form = document.querySelector('.form');
form.addEventListener('submit', addBookToLibrary);

const libraryContainer = document.querySelector('.library');
libraryContainer.addEventListener('click', deleteElement);

function deleteElement(event) { 
    const liElement = event.target.closest('.library__item');
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