let displayAdd = document.getElementById('showEl');

function show(){
  document.getElementById('taskAdd').style.display = "block";
  if(document.getElementById('taskList').style.display = "block");
  return document.getElementById('taskList').style.display = "none";
}
const result = document.getElementById("result-el");
/*// let taskName = document.getElementById('task-name').value;
// console.log(taskName);
// let taskDescription = document.getElementById('task-description').value;*/
const myTask = {
  taskname: "",
  description:""
}
const inputTask = {
  task : "input.value",
  description: "input.des"
}
window.localStorage.setItem("myTask", JSON.stringify(myTask));
let newTask = window.localStorage.getItem('myTask');
result.innerHTML = (JSON.stringify(newTask));

let resultEl = document.getElementById("result-el");
let resultP =document.getElementById("result1");
let nameInput = document.getElementById("task-name");
let descriptionInput = document.getElementById('task-description');

/*function getVal(){
const valueLog =document.querySelector("input").value;
console.log(valueLog);
}

// Set Item
localStorage.setItem("taskname", valueLog.value);
// Retrieve
document.getElementById("result-el").innerHTML = localStorage.getItem("taskname");

function force_load_gfg() {
  window.location = 
      "https://www.geeksforgeeks.org/"
}

function save() {
  window.location = 
      "/index.html"
}
save()
document.getElementById('my-button').addEventListener('click', function(){
  window.localStorage.setItem('task', 'nameInput.value');
  updateHTML();
})*/

// let a = document.getElementsByClassName("Add-task");
// console.log(a)
// function show(){
//  if (a.style.display === "block"){
//    a.style.display === "none";
//  } else {
//    a.style.display = "block";
//  }
// }

// var resultEl = document.getElementById('result-el');
var resultOne = document.getElementById('result1');
let deGen= document.querySelector('form.task-form').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();
resultEl.textContent = nameInput.value;
resultOne.textContent = descriptionInput.value;
    console.log(nameInput.value); 
    console.log(descriptionInput.value);   
});
 var outputEl = document.getElementById("result-el");
 outputEl.textContent = deGen;
 var saveEl = document.getElementById('my-button');

 
 function getName() {
  return localStorage.getItem("taskName");
}

/*function updateHTML() {
  var name = getName();
  document.getElementById("result-el").innerHTML = "Hello, " + name + "! Welcome!";
  document.getElementById("task-description").innerHTML = name;
}*/

function save() {
  document.getElementById("taskList").style.display = "block";
  document.getElementById("taskAdd").style.display = "none";
  // Gets input value
  var name = document.getElementById("task-name").value;
  var desT = document.getElementById("task-description").value;

  // Saves data to retrieve later
  localStorage.setItem("taskName", name);
  localStorage.setItem("taskDescription", desT);
  
  // Updates HTML
  updateHTML();
}

/*// let inputEl = document.getElementsByClassName("task-form");
// function save(){
//   var newMe = inputEl.textContent;
//   console.log(newMe);
//   outputEl.value = newMe;
// };
// save()
// let pName =""
// let thisItem = document.getElementById("result-el");
// console.log(thisItem);
// let thisDes = document.getElementById("result1");
// console.log(thisDes);
// let taskName= document.getElementById("task-name").value;
//  console.log(taskName);
// let taskDes = document.getElementById("task-description").value;
// console.log(taskDes);

function save(){
  thisItem.innerHTML= taskName;
};*/

// let fieldEl = document.querySelectorAll("input")[0].value;
// let saveEl = document.getElementById("result-el");

function increment(){
  let countEl = document.getElementById("count-el");

let count = 0;
  // document.getElementById("count-el");
    count ++
    countEl.textContent = count
    // // console.log(count);
}

//Timestamp
let d = new Date();
let text = d.toLocaleTimeString();
document.getElementById("timestamp").textContent = text;

//



//   function updateHTML() {
//     var taskName = localStorage.getItem("task-name", taskName);
//     var taskDes = localStorage.getItem("task-description", taskDes);
//     document.getElementById("result-el").innerHTML = taskName;
//     document.getElementById("result1").innerHTML = taskDes;
//   }
  
//   function myFunction() {
//     // Gets input value
//     var name = document.getElementById("task-name").value;
//     var des =document.getElementById("task-description").value;
//     // Saves data to retrieve later
//     localStorage.setItem("task-name", taskName);
    
//     // Updates HTML
//     updateHTML();
//   }


//   var myTask ={
//     name: "running",
//     description: "100 metres",
    
//     };
//   window.localStorage.setItem('user', JSON.stringify(myTask));
//   window.localStorage.getItem('user');
//   JSON.parse(window.localStorage.getItem('user'));

//   if (typeof(Storage) !== "undefined") {
//     // Code for localStorage
//     window.localStorage.setItem('user', JSON.stringify(myTask));
//   window.localStorage.getItem('user');
//   JSON.parse(window.localStorage.getItem('user'));
//     } else {
//      //"No web storage Support"
// }

/*--------------------------------------------Search------------------------------------------------------*/
// const courses= [
//   {name: 'business intelligence'},
//   {name: 'data analysis'},
//   {name: 'data science'},
//   {name: 'digital marketing'},
//   {name: 'employability skills'},
//   {name: 'mobile developemen'},
//   {name: 'project management'},
//   {name: 'social media marketing'},
//   {name: 'web development'}
//   ];
  
//   const list = document.getElementById('list');
  
//   function setList(group){
//   clearList();
//   for (const courses of group){
//   const item =document.createElement('li');
//   item.classList.add('list-group-item');
//   const text = document.createTextNode(courses.name);
//   item.appendChild(text);
//   list.appendChild(item);
//   }
//   if (group.length === 0){
//     setNoResults();
//   }
//   }
  
//   function clearList(){
//     while(list.firstChild){
//       list.removeChild(list.firstChild)
//     }
//   }
//   function setNoResults(){
//     const item =document.createElement('li');
//     item.classList.add('list-group-item');
//     const text = document.createTextNode('No results found');
//     item.appendChild(text);
//     list.appendChild(item);
//   }
  
//   function getRelevancy(value, searchTerm){
//     if(value === searchTerm){
//       return 2;
//     }else if (value.startWith(term)){
//       return 1;
//     }else{
//       return 0;
//     }
//   }
  
//   const searchInput =document.getElementById('search-input');
  
//   searchInput.addEventListener('input', (event) =>{
//     let value = event.target.value;
//     if(value && value.trim().length > 0){
//       value = value.trim().toLowerCase();
//       setList(courses.filter(learn =>{
//         return learn.name.includes(value);
  
//       }).sort((learnA, learnB) =>{
//         return getRelevancy(learnB.name, value)- getRelevancy(learnA.name, value);
//       }));
//     }else{
//       clearList();
//     }
//   })


