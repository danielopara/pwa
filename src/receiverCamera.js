import { uid } from "./uid";
const openCamera = document.getElementById("openCamera");
const camera = document.getElementById("camera");
const encryptionKey = "open";
const { AES, enc } = require("crypto-js");

function decryptString(encryptedData) {
  const decryptedData = AES.decrypt(encryptedData, encryptionKey).toString(
    enc.Utf8
  );
  return decryptedData;
}

//remove
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

//save to indexed db
const credit = function (amount, descText, reference, name) {
  let transactions = null;
  let db = null;
  const DBOpen = indexedDB.open("transactionDb", 2);

  DBOpen.addEventListener("error", (err) => {
    console.warn(err);
  });

  DBOpen.addEventListener("success", (ev) => {
    db = ev.target.result;
    console.log("success", db);
    transact();
  });

  DBOpen.addEventListener("upgradeneeded", (ev) => {
    db = ev.target.result;
    console.log("upgraded", db);
    if (!db.objectStoreNames.contains("transactionStore")) {
      transactions = db.createObjectStore("transactionStore", {
        keyPath: "id",
      });
    }
  });
  console.log("worked");

  function transact() {
    let transfer = {
      id: uid(),
      name: name,
      transaction_reference: reference,
      amount: amount,
      balance: 100 + amount,
      transaction_timestamp: 3,
      type: "credit",
      classification: "classText",
      description: descText,
      synced: 0,
      time: Date.now(),
    };
    let tx = db.transaction("transactionStore", "readwrite");
    tx.onComplete = (ev) => {
      console.log(ev);
    };

    tx.onError = (err) => {
      console.log(err);
    };

    let store = tx.objectStore("transactionStore");
    let addMoney = store.add(transfer);

    addMoney.onsuccess = (ev) => {
      console.log("MONEY ADDED", ev);
    };
    addMoney.onerror = (err) => {
      console.log("failed", err);
    };
  }
};

openCamera.addEventListener("click", () => {
  if (camera.style.display === "none") {
    camera.style.display = "block";
  } else {
    camera.style.display = "none";
  }
});

function onScanSuccess(qrCodeMessage) {
  const message = qrCodeMessage.split(" ");
  const firstValue = message[0];
  const dec = decryptString(firstValue);

  if (dec == "true") {
    localStorage.setItem("scanSuccess", "true");
    if (localStorage.getItem("scanSuccess") === "true") {
      const payment = qrCodeMessage.split(" ");
      const name = payment[2];
      const amount = payment[4];
      const description = payment[6];
      const reference = payment[8];
      credit(name, amount, description, reference);
      window.location.href = "/dist/success-page.html";
      qrCodeScanner.clear();
    }
  } else {
    console.log("bad qr");
  }
}

function onScanError() {
  // console.log("error")
}

var qrCodeScanner = new Html5QrcodeScanner("reader", { fps: 60, qrBox: 250 });

qrCodeScanner.render(onScanSuccess, onScanError);
