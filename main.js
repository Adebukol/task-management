const inputBox= document.getElementById('task-name');
const descriptionBox = document.getElementById('task-description')
const taskContainer= document.getElementById('task-page');
const dData = document.getElementById('des');
const firstCount = document.getElementById('countEl');
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
//     taskContainer.appendChild(li);
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
    document.getElementById("task-display").style.display = "none";
    document.getElementById("add-task").style.display = "block";
    
   }
  //  else if(inputBox.value === '' || descriptionBox.value === ''){
  //   return dontGo;
  //  }
   else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + "  " + " - " + descriptionBox.value + " " + " " + " " + " - " + timeNow;
    taskContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}
  saveData()
  inputBox.value = "";
  descriptionBox.value = "";

}

let x = 5
let b = 2
let z = x/b * 100
console.log(z)
let countTask =     document.getElementById("countEl")
let taskClosed = document.getElementById("totalTask")
let completionRate = document.getElementById("completionPercent")

taskContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    countTask.innerHTML ++
    saveData()
    saveCount()
  }else if(e.target.tagName === "LI"){
    e.target.classList.toggle("");
    countTask.innerHTML --
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    taskClosed.innerHTML ++
    saveData()
    saveCount()
  }
}, false);

let percent = countTask.innerHTML/taskClosed.innerHTML * 100
completionRate.innerHTML

function saveData(){
  localStorage.setItem("input", taskContainer.innerHTML);
  //localStorage.setItem("input",countTask.innerHTML);
}

function showTask(){
  taskContainer.innerHTML = localStorage.getItem("input")
  //countTask.innerHTML = localStorage.getItem("input")
}
showTask();

function saveCount(){
  localStorage.setItem("display", countEl.innerHTML);
  localStorage.setItem("display", totalTask.innerHTML);
}

function showCount(){
  countEl.innerHTML = localStorage.getItem("display")
  totalTask.innerHTML = localStorage.getItem("display")
}
showCount();




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

