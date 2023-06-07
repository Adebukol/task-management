const inputBox= document.getElementById('task-name');
const descriptionBox = document.getElementById('task-description')
const listContainer= document.getElementById('task-list');
const dData = document.getElementById('des');
// function save(){
//   if(inputBox.value === ''){
//     alert("you cant leave blank!");
//   }
//   else{
//     let li = document.createElement("li");
//     li.innerHTML = inputBox.value;
//     // li.innerHTML = descriptionBox.value;
//     listContainer.appendChild(li);
//     let span = document.createElement("span");
//     span.innerHTML = "\u00d7";
//     li.appendChild(span);
//   }
//   saveData()
//   inputBox.value = "";

// }
function save(){
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " " + descriptionBox.value + " " + d;
    // li.innerHTML = descriptionBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  
  saveData()
  inputBox.value = "";

}


listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData()
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData()
  }
}, false);

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data")
}
showTask();

const d = new Date();
document.getElementById("timestamp").innerHTML = d;


// let displayAdd = document.getElementById('showEl');

function show(){
  if(document.getElementById('add-task').style.display= "none"){
    return document.getElementById("add-task").style.display = "block"
  }
  if(document.getElementById('task-display').style.display= "block"){
    return document.getElementById("task-dis").style.display = "none"
  }
}

//   document.getElementById('taskAdd').style.display = "block";
//   document.getElementById('increment-btn').style.display = "block";
//   document.getElementById('timestamp').style.display = "block"
//   if(document.getElementById('taskList').style.display = "block");
//   return document.getElementById('taskList').style.display = "none";
// }

// const result = document.getElementById('result-el')
// document.querySelector('form.task-form').addEventListener('input', function(e) {
//   const inputValues =JSON.parse(localStorage.getItem('inputvalue')) || [];
//   const storedValue = [inputValues.e.target.textContent];
//   localStorage.setItem('inputvalue', JSON.stringify(storedValue));
//   // localStorage.setItem('taskdes', document.getElementById('task-description').value);
// })

