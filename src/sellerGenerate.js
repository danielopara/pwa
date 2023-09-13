const qrCode = require("qrcode");
const time = require("./time");
const { AES, enc } = require("crypto-js");

const display = document.getElementById("qrDisplay");
const amount = localStorage.getItem("amount");
const description = localStorage.getItem("description");

const encryptionKey = "open";

function encrypString(data) {
  const encryptedData = AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
}

function encryptNumber(data) {
  try {
    const dataString = data.toString();
    const utf8Data = enc.Utf8.parse(dataString);
    const encryptedData = AES.encrypt(utf8Data, encryptionKey).toString();
    return encryptedData;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
}

// encrypting variables
const amountDisplay = "amount";
const descDisplay = "description";
const timeDisplay = "time";
const nameDisplay = "name";

const username = encrypString(nameDisplay);
const amt = encrypString(amountDisplay);
const desc = encrypString(descDisplay);
const tme = encrypString(timeDisplay);

const generateQRCode = (text) => {
  qrCode.toCanvas(display, text, {
    width: 250,
    height: 250,
  });
};

function showQRCode() {
  const firstValue = encrypString("true");
  const newAmount = encryptNumber(amount);
  const newDescritption = encrypString(description);
  const timeDate = new Date();
  const newDate = timeDate.setMinutes(timeDate.getMinutes() + 10);
  const getMins = new Date(newDate);
  const displayName = localStorage.getItem("name");
  const pay = `${firstValue} ${username}: ${displayName} ${amt}: ${newAmount} ${desc}: ${newDescritption} ${tme}: ${getMins.toLocaleString()}`;
  console.log(getMins);
  if (localStorage.getItem("generateQRCode") === "true") {
    generateQRCode(pay);
    console.log(pay);
    localStorage.removeItem("generateQRCode");
    localStorage.removeItem("description");
    localStorage.removeItem("amount");
  } else {
    console.log("false");
  }
}

showQRCode();
