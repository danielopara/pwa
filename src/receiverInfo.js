const time = require("./time");

const amount = localStorage.getItem("amount");
const username = localStorage.getItem("name");
const description = localStorage.getItem("description");

const amountDisplay = document.getElementById("amount");
const descriptionDisplay = document.getElementById("description");
const nameDisplay = document.getElementById("name");
const timeDisplay = document.getElementById("time");

amountDisplay.innerHTML = amount;
descriptionDisplay.innerHTML = description;
nameDisplay.innerHTML = username;
timeDisplay.innerHTML = time.time;

const generate = document.getElementById("generate");
generate.addEventListener("click", () => {
  localStorage.setItem("generateQRCode", "true");
});
