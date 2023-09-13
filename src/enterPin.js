const generate = document.getElementById("generate");
const showPin = document.getElementById("showPin");
const offlineBalance = localStorage.getItem("offlineBalance");

generate.addEventListener("click", () => {
  var inputs = showPin.getElementsByTagName("input");
  var joinInputs = "";
  localStorage.setItem("password", "1111");
  for (var i = 0; i < inputs.length; i++) {
    var inputValue = inputs[i].value;
    joinInputs += inputValue;
  }
  console.log(joinInputs);

  if (localStorage.getItem("password") == joinInputs) {
    console.log("true");
    if (offlineBalance > 0) {
      window.location.href = "/dist/senders-QR-code.html";
    } else {
      console.log("no warrents");
    }

    localStorage.setItem("correctPin", "true");
  } else {
    console.log("false");
  }
});
