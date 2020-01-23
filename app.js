//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){}

//add Book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>
    `;
    list.appendChild(row);
}

//alert 
UI.prototype.showAlert = function(message, className){
    //Create and add new alert div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.book-container');
    const form = document.querySelector('.book-form');
    container.insertBefore(div, form);
    // Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}

// Clear book 
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Delete book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

function Store (){}

Store.prototype.getBooks = function(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}
Store.prototype.displayBooks = function(){
    
}
Store.prototype.addBook = function(book){
    const books = store.getBooks();
    books.push(book);
    localStorage.getItem('book',JSON.stringify(books))
}
Store.prototype.removeBook = function(isbn){
    
}


//Event Listeners to add book
document.getElementById('book-form').addEventListener('submit', function(e){

    //Get the values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    // Instantiate book object
    const book = new Book(title, author, isbn);
        //instatiate UI
    const ui = new UI();

    if ( title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }else{

        //Add book to list   
        ui.addBookToList(book);

        const store = new Store;
        store.getBooks(book);

        ui.showAlert('Book Added!', 'success');

        ui.clearFields(book);
    }
    e.preventDefault();
});


// Event Listeners to delete book
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Deleted!', 'success');
    e.preventDefault();
})