const { AES, enc } = require("crypto-js");
const balance = document.getElementById("balance-amount");
const syncButton = document.getElementById("syncButton");
const offlineBalance = localStorage.setItem("offlineBalance", 50000);

const encryptionKey = "open";

//show name on home page

const getName = localStorage.getItem("name");

function displayName() {
  if (getName) {
    document.getElementById("showName").textContent = `Welcome ${getName}!`;
    document.getElementById("navName").textContent = `${getName}`;
  } else {
    console.log("false");
  }
}
function displayMoney() {
  const getMoney = localStorage.getItem("offlineBalance");
  document.getElementById("balanceOffline").textContent = `${getMoney}`;
  document.getElementById("balanceOffline2").textContent = `${getMoney}`;
}
displayMoney();

displayName();

//syncDialog
function syncDialog(message, callback) {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";

  const dialogContainer = document.createElement("div");
  dialogContainer.classList.add("dialog-container", "show");

  const content = document.createElement("div");
  content.classList.add("content");
  content.textContent = message;

  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "Close";

  button.addEventListener("click", () => {
    if (callback && typeof callback === "function") {
      callback();
    }
    dialogContainer.remove();
    overlay.style.display = "none";
    // close()x
  });

  dialogContainer.appendChild(content);
  dialogContainer.appendChild(button);
  document.body.appendChild(dialogContainer);
}

//decrypt
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
// Balance
const totalBalance = function () {
  let transactions = null;
  let db = null;
  const DBOpen = indexedDB.open("transactionDb", 2);

  DBOpen.addEventListener("error", (err) => {
    console.warn(err);
  });

  DBOpen.addEventListener("success", (ev) => {
    db = ev.target.result;
    balanceSum();
    console.log("success", db);
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

  function balanceSum() {
    let tx = db.transaction("transactionStore", "readonly");
    tx.oncomplete = (ev) => {
      console.log(ev);
    };
    tx.onerror = (err) => {
      console.warn(err);
    };
    let store = tx.objectStore("transactionStore");
    let getBalance = store.getAll();
    getBalance.onsuccess = (ev) => {
      let transfers = ev.target.result;
      const mappedTransfers = transfers.map((item) => {
        return {
          // decryptNumber(item.amount)
          amount: item.amount,
          balance: item.balance,
        };
      });
      let answer = mappedTransfers;
      console.log(answer);

      let sum = 0;
      for (let i = 0; i < answer.length; i++) {
        sum += answer[i].balance;
      }

      const offlineBalance = localStorage.getItem("offlineBalance");
      const newSum = parseInt(offlineBalance) - parseInt(sum);
      localStorage.setItem("offlineBalance", newSum);
      balance.innerHTML = "#" + newSum;

      console.log("Total balane:", decryptNumber(sum));
      localStorage.removeItem("newMoney");
    };
  }
};

//change Sync status
const changeSyncStatus = function () {
  let transactions = null;
  let db = null;
  const DBOpen = indexedDB.open("transactionDb", 2);
  DBOpen.addEventListener("error", (err) => {
    console.warn(err);
  });

  DBOpen.addEventListener("success", (ev) => {
    db = ev.target.result;

    if (navigator.onLine) {
      changeSync();
    }
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

  function changeSync() {
    let tx = db.transaction("transactionStore", "readwrite");
    tx.oncomplete = (ev) => {
      console.log(ev);
    };
    tx.onerror = (err) => {
      console.log(err);
    };
    let store = tx.objectStore("transactionStore");
    let getHistory = store.getAll();
    getHistory.onsuccess = (ev) => {
      let history = ev.target.result;
      const mappedHistory = history.map((item) => {
        return {
          ...item,
          synced: 1,
        };
      });
      mappedHistory.forEach((mappedHistory) => {
        store.put(mappedHistory);
      });
    };
    getHistory.onerror = (err) => {
      console.log(err);
    };
    console.log("changeSync()");
  }
};

//syncing endpoint
function sendData(data) {
  fetch("http://localhost:2020/syncArray", {
    // mode : 'cors',
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      mandatorySync();
      changeSyncStatus();
      const currentTime = new Date();
      localStorage.setItem("lastSyncTime", currentTime);
    })
    .catch((err) => {
      console.log("error: did not sync. \n" + err);
    });
}

const sync = function () {
  let transactions = null;
  let db = null;
  const DBOpen = indexedDB.open("transactionDb", 2);
  DBOpen.addEventListener("error", (err) => {
    console.warn(err);
  });

  DBOpen.addEventListener("success", (ev) => {
    db = ev.target.result;

    if (navigator.onLine) {
      syncNow();
    } else {
      syncDialog("Error Syncing no network connection");
    }
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

  function syncNow() {
    let tx = db.transaction("transactionStore", "readonly");
    tx.oncomplete = (ev) => {
      // console.log(ev)
    };
    tx.onerror = (err) => {
      console.log(err);
    };
    let store = tx.objectStore("transactionStore");
    let getHistory = store.getAll();
    getHistory.onsuccess = (ev) => {
      let history = ev.target.result;

      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (ev) => {
        const cursor = ev.target.result;
        if (!cursor) {
          console.log("no transaction history");
        }
        {
          const mappedHistory = history.map((item) => {
            return {
              id: item.id,
              balance: decryptNumber(item.balance),
              amount: decryptNumber(item.amount),
              transaction_reference: item.transaction_reference,
              //   transaction_timestamp : decryptData(item.transaction_timestamp),
              type: item.type,
            };
          });
          let transactionArray = mappedHistory;
          console.log(transactionArray);
          sendData(transactionArray);
        }
      };
    };
    getHistory.onerror = (err) => {
      console.log(err);
    };
  }
};

function mandatorySync() {
  const currentSync = new Date();
  const nextSync = new Date(currentSync.getTime());
  nextSync.setMinutes(nextSync.getMinutes() + 10);
  localStorage.setItem("mandatorySync", nextSync);
}

syncButton.addEventListener("click", () => {
  if (sync()) {
    syncDialog("Success");
  } else {
    syncDialog("error");
  }
  // mandatorySync()
});

const mandatorySyncTime = localStorage.getItem("mandatorySync");
function forceSync() {
  if (navigator.onLine && Date() >= mandatorySyncTime) {
    console.log("navigator is online");
    //  sync()
    //  mandatorySync()
  } else {
    console.log("not time");
  }
}

// function intervalFunc(){
//   if(mandatorySyncTime){
//     if(Date() >= mandatorySyncTime){
//         console.log('true')
//         syncDialog("Time to Sync",()=>{
//           sync()
//           mandatorySync()
//           run()
//         })
//     } else {
//       console.log('false')
//       run()
//     }
//   }
// }
// function run(){
//   const interval = 3000
//   setTimeout(function(){
//     intervalFunc()
//   }, interval)
// }

//  run()
forceSync();
totalBalance();

const dbName = "transactionDb";
const dbVersion = 2;

const request = indexedDB.open(dbName, dbVersion);
request.onerror = function (event) {
  console.error("Error opening the database:", event.target.errorCode);
};

request.onsuccess = function (event) {
  const db = event.target.result;

  const transaction = db.transaction(["transactionStore"], "readonly");
  const objectStore = transaction.objectStore("transactionStore");
  const getAllRequest = objectStore.getAll();

  getAllRequest.onsuccess = function (event) {
    const allData = event.target.result;
    const mappedHistory = allData.map((item) => {
      // return{
      // //   balance : decryptNumber(item.balance),
      //   amount : decryptNumber(item.amount),
      // //   transaction_timestamp : decryptData(item.transaction_timestamp),
      //   type : item.type
      // }
      return item;
    });
    console.log("All data from the IndexedDB database:", mappedHistory);

    const transferHistory = document.getElementById("transactionHistory");
    //styling for transferHistory
    transferHistory.style.marginLeft = "10px";
    transferHistory.style.marginRight = "10px";
    transferHistory.style.border = "border-box";

    mappedHistory.forEach((item) => {
      const creditImage = document.createElement("img");
      const debitImage = document.createElement("img");

      creditImage.src = "/assets/img/paper-plane2.ico";
      debitImage.src = "/assets/img/paper-plane1.ico";

      const credit = document.createElement("p");
      const amount1 = document.createElement("p");
      credit.classList.add("receive", "mt-1");

      const debit = document.createElement("p");
      debit.classList.add("send", "mt-3");
      const amount2 = document.createElement("p");

      const dividingLine = document.createElement("hr");
      dividingLine.style.marginRight = "10%";
      dividingLine.style.marginLeft = "10%";

      const textTime = document.createElement("p");
      textTime.classList.add("small", "m-2", "tran-color");
      textTime.style.fontSize = "small";
      textTime.style.paddingBottom = "20px";

      if (item.type == "credit") {
        credit.textContent = item.type;
        amount1.textContent = item.amount;
        textTime.textContent = item.time;

        //style
        credit.style.display = "flex";
        credit.style.flexWrap = "wrap";
        credit.style.justifyContent = "space-between";
        credit.style.width = "90vw";
        credit.style.margin = "0 auto";
        amount1.style.marginRight = "20px";

        // creditImage.appendChild(credit)
        credit.appendChild(amount1);
        transferHistory.appendChild(creditImage);
        transferHistory.appendChild(credit);
        transferHistory.appendChild(textTime);
        transferHistory.appendChild(dividingLine);
      }

      if (item.type == "Debit") {
        debit.textContent = item.type;
        amount2.textContent = decryptNumber(item.amount);
        textTime.textContent = item.time;

        //style
        debit.style.display = "flex";
        debit.style.flexWrap = "wrap";
        debit.style.justifyContent = "space-between";
        debit.style.width = "90vw";
        debit.style.margin = "0 auto";
        amount2.style.marginRight = "20px";

        debit.appendChild(amount2);
        transferHistory.appendChild(debitImage);
        transferHistory.append(debit);
        transferHistory.appendChild(textTime);
        transferHistory.appendChild(dividingLine);
      }
    });
  };

  getAllRequest.onerror = function (event) {
    console.error(
      "Error retrieving data from the database:",
      event.target.errorCode
    );
  };
};

const today = new Date();
today.setDate(today.getDate() - 10);
console.log(today.toLocaleString());
const anotherDay = new Date(today);
today.setDate(today.getDate() - 1);
console.log(anotherDay.toLocaleString());

const testDay = today.getDate();

function timeTest() {
  if (testDay == "31") {
    console.log("yes");
  } else {
    console.log("false");
  }
}

timeTest();
