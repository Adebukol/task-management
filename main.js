const inputBox= document.getElementById('task-name');
const listContainer= document.getElementById('task-list');
function save(){
  if(inputBox.value === ''){
    alert("you cant leave blank!");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
  }
}
let displayAdd = document.getElementById('showEl');

function show(){
  document.getElementById('result-el').textContent = JSON.parse(localStorage.getItem('input-values')) || ['myTask']
  document.getElementById('taskAdd').style.display = "block";
  document.getElementById('increment-btn').style.display = "block";
  document.getElementById('timestamp').style.display = "block"
  if(document.getElementById('taskList').style.display = "block");
  return document.getElementById('taskList').style.display = "none";
}

const result = document.getElementById('result-el')
document.querySelector('form.task-form').addEventListener('input', function(e) {
  const inputValues =JSON.parse(localStorage.getItem('inputvalue')) || [];
  const storedValue = [inputValues.e.target.textContent];
  localStorage.setItem('inputvalue', JSON.stringify(storedValue));
  // localStorage.setItem('taskdes', document.getElementById('task-description').value);
})

