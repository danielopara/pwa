const username = localStorage.getItem("name");

if (username) {
  document.getElementById("fullName").textContent = username;
}
