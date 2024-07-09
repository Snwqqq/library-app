const dialog = document.querySelector("dialog");
const openDialog = document.querySelector(".add-book");
const closeBut = document.querySelector(".cancel")
const addButton = document.querySelector(".add")
const userTitle = document.querySelector("#title");
const userAuthor = document.querySelector("#author");
const userPages = document.querySelector("#pages");
const userRead = document.querySelector("#read");
const main = document.querySelector("main");

openDialog.addEventListener("click", ()=>{
    dialog.showModal();
})
closeBut.addEventListener("click", ()=>{
    dialog.close();
});

addButton.addEventListener("click", (event)=>{
    if (userTitle.checkValidity() && userAuthor.checkValidity() && userPages.checkValidity()) {
        event.preventDefault();
        let read;
       if(userRead.checked){
        read = true;
       }
       else
       {
        read=false;
       }
       let book = new Book(userTitle.value,userAuthor.value,userPages.value,read);
       createDiv(book);
       dialog.close();
    }
})



function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.read = read;
}

function createDiv(book){
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-container");
    main.appendChild(newDiv);
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
    }

