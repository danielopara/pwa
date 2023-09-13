const qrCode = require("qrcode");
const { AES, enc } = require("crypto-js");
import { uid, generateReferenceNumber } from "./uid";
const senderQR = document.getElementById("senderQR");
const encryptionKey = "open";

const generateQR = (text) => {
  qrCode.toCanvas(senderQR, text, {
    width: 250,
    height: 250,
  });
};

function encrypString(data) {
  const encryptedData = AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
}

function encryptNumber(data) {
  try {
    const dataString = data.toString(); // Convert numeric value to string
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

const amt = encrypString(amountDisplay);
const desc = encrypString(descDisplay);
const tme = encrypString(timeDisplay);

const debit = function (name, amount, descText, reference) {
  let transactions = null;
  let db = null;
  const DBOpen = indexedDB.open("transactionDb", 2);

  DBOpen.addEventListener("error", (err) => {
    console.warn(err);
  });

  DBOpen.addEventListener("success", (ev) => {
    db = ev.target.result;
    console.log("Success", db);
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
      transaction_reference: reference,
      amount: encrypString(amount),
      balance: 100 - amount,
      description: encrypString(descText),
      type: "Debit",
      classification: "classText",
      synced: 0,
      name: name,
      time: Date.now(),
    };

    let tx = db.transaction("transactionStore", "readwrite");
    tx.onComplete = (ev) => {
      console.log(ev);
    };

    tx.onError = (err) => {
      console.warn(err);
    };

    let store = tx.objectStore("transactionStore");
    let removeMoney = store.add(transfer);

    removeMoney.onsuccess = (ev) => {
      console.log("MONEY REMOVED", ev);
    };
    removeMoney.onerror = (err) => {
      console.log("Failed", err);
    };
  }
};

function showQR() {
  if (localStorage.getItem("correctPin") === "true") {
    const reference = generateReferenceNumber();
    const newAmount = localStorage.getItem("newAmount");
    const newDescription = localStorage.getItem("newDescription");
    const newName = localStorage.getItem("newName");

    const firstValue = encrypString("true");
    const newAmountDisplay = encryptNumber(newAmount);
    const newDescritptionDisplay = encrypString(newDescription);

    const pay = `${firstValue} ${username}: ${newName} ${amt}: ${newAmountDisplay} ${desc}: ${newDescritptionDisplay} reference: ${reference}`;
    generateQR(pay);
    debit(newAmount, newDescription, reference);
    localStorage.removeItem("correctPin");
  }
}

showQR();
