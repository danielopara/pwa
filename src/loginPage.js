const email = document.getElementById("emailText");
const password = document.getElementById("passwordText");
const login = document.getElementById("login");
const checkAuth = document.getElementById("checkAuth");

function loginUser(data) {
  fetch("http://localhost:2020/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error) {
        console.log("Error: " + res.error);
      } else {
        if (res.success) {
          console.log("Success: " + res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("name", res.userName);
          window.location.href = "./homepage.html";
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

login.addEventListener("click", (e) => {
  const userEmail = email.value;
  const userPassword = password.value;

  const userData = {
    email: userEmail,
    password: userPassword,
  };
  loginUser(userData);
});

function checkAuthentication() {
  fetch("http://localhost:2020/auth", {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.message);
    })
    .catch((err) => {
      console.log(err);
    });
}

checkAuth.addEventListener("click", (e) => {
  // e.preventDefault()
  checkAuthentication();
});
