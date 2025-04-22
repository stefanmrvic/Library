import '../styles/style.scss';

const myLibrary = [
    {title: 'Na livadi divnoj', author: 'Lepi Stevdza', pages: 304, read: 'Have read it', id: '29083098-dlskdd-ws9923-sdsss'},
    {title: 'Pevaj Golube', author: 'Dzigi', pages: 124, read: 'Didnt read it', id: '9839837-hjhh-sbsxb-97867'},
    {title: 'Ko to tamo stenje', author: 'Savo Dzigljavi', pages: 324, read: 'Didnt read it', id: '829430-jhbmjm-huhhh-79987'},
    {title: 'Egzotika', author: 'Miloje Slepi', pages: 24, read: 'Didnt read it', id: '8987678-jhjhh-88888-0000'},
    {title: 'Mile prasuma', author: 'Dve Dangube', pages: 499, read: 'Have read it', id: 'kjhkjds-29883-dkjdfkj-22222'},
    {title: 'Tvoja mama', author: 'Zoran Dzindzic', pages: 543, read: 'Have read it', id: '2222- sjhsjh-1111-0000'}

];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(event) {
    event.preventDefault();

    const title = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    
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

    const newCloseBtn = document.createElement('button');
    newCloseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18v2H3V6zm2 3h14v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9zm3 2v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2z"/>
        </svg>
    `;
    newCloseBtn.classList.add('library__item__close-btn');

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
    newRead.textContent = book.read;
    newRead.classList.add('library__item__read');

    parentContainer.append(newLI);
    newLI.append(newCloseBtn, newTitle, newAuthor, newPages, newRead);
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

function deleteElement(event) { 
    const button = event.target.closest('button');
    const liElement = event.target.closest('.library__item');
    
    if (!button || !liElement) return;

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
    const liBookElements = document.querySelectorAll('.library__item');

    for (const obj of myLibrary) {
        if (!obj.id) {
            throw new Error(`Element in array doesn't have an ID!`);
        }

        const objectID = obj.id;
        let newObject = true;

        for (const element of liBookElements) {
            if (element.dataset.id === objectID) {
                newObject = false;
            }
        }

        if (newObject) {
            addElement(obj);
        }
    }
}

renderLibrary();