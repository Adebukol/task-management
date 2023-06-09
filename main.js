const inputBox= document.getElementById('task-name');
const descriptionBox = document.getElementById('task-description')
const listContainer= document.getElementById('task-list');
const dData = document.getElementById('des');
const firstCount = document.getElementById('count-el');
const secondCount = document.getElementById('totalTask');
const timeCount = new Date()
const hours =timeCount.getHours();
const minute =timeCount.getMinutes();
const seconds =timeCount.getSeconds();
const timeNow = `${hours}:${minute}: ${seconds}`;

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
// const dontGo = document.getElementById("add-task").style.display = "block";
function save(){
   document.getElementById("task-display").style.display = "block";
   document.getElementById("add-task").style.display = "none";
   if(inputBox.value === '' || descriptionBox.value === ''){
    alert("The field is required")
   }
  //  else if(inputBox.value === '' || descriptionBox.value === ''){
  //   return dontGo;
  //  }
   else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + "  " + " - " + descriptionBox.value + " " + " " + " " + " - " + timeNow;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}
  saveData()
  inputBox.value = "";
  descriptionBox.value = "";

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




// let displayAdd = document.getElementById('showEl');

function show(){
  document.getElementById("add-task").style.display = "block"
  document.getElementById("task-display").style.display = "none"
  }

  firstCount.addEventListener("click", function(e){
    if(e.target.classList.toggle("checked")){
      e++
    }
  })


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

