const dialog = document.querySelector("dialog");
const openDialog = document.querySelector(".add-book");
const closeBut = document.querySelector(".cancel")
const addButton = document.querySelector(".add")
const main = document.querySelector("main");
const grid = document.querySelector(".book-grid");
const userTitle = document.querySelector("#title");
const userAuthor = document.querySelector("#author");
const userPages = document.querySelector("#pages");
const userRead = document.querySelector("#read");

let arrayOfBooks = [];
let gridArray = [];

class Book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author = "by " + author;
        this.pages = pages + " pages";
        this.read = read;
    }
}


const createStartingBooks = function(){
    const book1 = new Book('To Kill a Mockingbird','Harper Lee',281,true);
    const book2 = new Book('1984','George Orwell',328,false);
    arrayOfBooks.push(book1);
    arrayOfBooks.push(book2);
    UpdateGrid();
}();




function AddBook(){
    let book = new Book(userTitle.value,userAuthor.value,userPages.value,(userRead.checked?true:false));
    if(!arrayOfBooks.some((element)=> element.title===book.title&&element.author===book.author&&element.pages===book.pages)){
    arrayOfBooks.push(book);
    }
}

function RemoveBook(div,num){
    arrayOfBooks.splice(num,1);
    gridArray = gridArray.filter((element)=>element!==div);
    UpdateGrid();
}



function UpdateGrid(){
while(main.childElementCount>2 ){
    main.removeChild(main.lastChild);
    gridArray = [];
}


 for (const book of arrayOfBooks){
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-container");
    main.appendChild(newDiv);

    const deleteImg = document.createElement("img");
    deleteImg.src="./Images/delete-empty.svg";
    deleteImg.classList.add("delete-img");
    deleteImg.id = gridArray.length;


    for(let i = 0;i<4;i++){
        let newP = document.createElement("p");
        switch (i){
            case 0:
                newP.classList.add("name");
                newP.textContent = book.title;
            break;
            case 1:
                newP.classList.add("author")
                newP.textContent = "by "+book.author;
            break;
            case 2:
                newP.classList.add("pages")
                newP.textContent = book.pages;
            break;
            case 3:
                newP.classList.add("read")
                if(book.read===true){
                    newP.textContent = "Read";
                }
                else{
                    newP.textContent = "Not Read";
                    newP.classList.add("red");
                }
            break;
            }
        newDiv.appendChild(newP);
        }
        newDiv.appendChild(deleteImg);
        gridArray.push(newDiv);
        findNewDeleteButtons();
    }
    }
    













    function findNewDeleteButtons() {
        const deleteImgButtons = document.querySelectorAll(".delete-img");
        deleteImgButtons.forEach(button => {
            // Remove the existing event listener if it exists
            button.removeEventListener("click", handleDeleteButtonClick);
            // Add the new event listener
            button.addEventListener("click", handleDeleteButtonClick);
        });
    }



function handleDeleteButtonClick(event) {
    const button = event.target;
    console.log(button.id);
    if (button.id === event.target.id) {
    console.log(event.target.id);
        RemoveBook(button.parentElement,button.id);
    }
}




openDialog.addEventListener("click", ()=>{
    dialog.showModal();
})
closeBut.addEventListener("click", (event)=>{
    event.preventDefault()
    dialog.close();
});

addButton.addEventListener("click", (event)=>{

    if (userTitle.checkValidity() && userAuthor.checkValidity() && userPages.checkValidity()) {
        event.preventDefault();
        AddBook();
        UpdateGrid();
        userAuthor.value='';
        userPages.value='';
        userTitle.value='';
        userRead.checked = false;
        dialog.close();
    }
})




