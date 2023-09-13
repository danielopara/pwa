const time = require("./time");

const accept = document.getElementById("accept");

const amountDisplay = document.getElementById("amount");
const nameDisplay = document.getElementById("name");
const descriptionDisplay = document.getElementById("description");
const timeDisplay = document.getElementById("time");

const newAmount = localStorage.getItem("newAmount");
const newName = localStorage.getItem("name");
const newDescription = localStorage.getItem("newDescription");

function showReceipt() {
  amountDisplay.innerHTML = newAmount;
  descriptionDisplay.innerHTML = newDescription;
  nameDisplay.innerHTML = newName;
  timeDisplay.innerHTML = time.time;
}

showReceipt();

// accept.addEventListener('click', ()=>{
//     localStorage.removeItem('newAmount')
//     localStorage.removeItem('newDescription')
// })
