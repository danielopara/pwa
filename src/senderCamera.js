const openCamera = document.getElementById("openQR");
const camera = document.getElementById("camera");
const encryptionKey = "open";
const { AES, enc } = require("crypto-js");

function decryptString(encryptedData) {
  const decryptedData = AES.decrypt(encryptedData, encryptionKey).toString(
    enc.Utf8
  );
  return decryptedData;
}
function decryptNumber(encryptedData) {
  try {
    const decryptedBytes = AES.decrypt(encryptedData, encryptionKey);
    const decryptedDataString = decryptedBytes.toString(enc.Utf8);
    const decryptedData = parseFloat(decryptedDataString);
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

openCamera.addEventListener("click", () => {
  if (camera.style.display === "block") {
    camera.style.display = "none";
    console.log("on");
  } else {
    camera.style.display = "block";
    console.log("off");
  }
});

function onScanSuccess(qrCodeMessage) {
  const message = qrCodeMessage.split(" ");
  const firstValue = message[0];
  const timeCheck = message[8];
  console.log(timeCheck);
  const dec = decryptString(firstValue);
  const checkTime = new Date();

  if (dec == "true") {
    if (timeCheck > checkTime.toLocaleTimeString()) {
      const message = qrCodeMessage.split(" ");

      const name = message[2];
      const amount = message[4];
      const description = message[6];
      const decryptAmount = decryptNumber(amount);
      const decryptDesc = decryptString(description);

      localStorage.setItem("newName", name);
      localStorage.setItem("newAmount", decryptAmount);
      localStorage.setItem("newDescription", decryptDesc);

      window.location.href = "/dist/senders-confirmation.html";
      console.log(qrCodeMessage);
      localStorage.setItem("ScanSuccess", "true");
      qrCodeMessage.clear();
    } else {
      console.log("Old QR");
    }
  } else {
    console.log("wrong");
  }
}

function onScanError() {
  // console.log()
}

var qrCodeScanner = new Html5QrcodeScanner("reader", { fps: 60, qrBox: 250 });

qrCodeScanner.render(onScanSuccess, onScanError);
