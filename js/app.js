console.log("we are in app.js");
showNotes();
// if user add a note then add it to the localstaorage.

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // notesObj.push(addTxt.value);
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
})

function showNotes() {

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function (element, index) {

        html += `
        <div class=" noteCard my-2 mx-2 card " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id = "${index}"  onclick= "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
      </div>
                   `;
    });

    let notesElm = document.getElementById("notes");

    if (notesObj != null) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `nothing to show! first u have to add a note!`
    }



}

// function for deleting note

// let deletebtn = document.getElementById(`${index}`)
// deletebtn.addEventListener('click',deleteNote(index))

function deleteNote(index){

    console.log("deleting note",index);
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//function for search

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
     
    let inputVal = search.value();
    console.log("input event fired!",inputVal);

    let noteCards =document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){

        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    })

})




