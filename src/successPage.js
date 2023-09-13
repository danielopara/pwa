const time = require('./time')

const doneTransfer = document.getElementById('done')
const timeDisplay = document.getElementById('date')
const amountDispplay = document.getElementById('amount')
const descriptionDisplay = document.getElementById('description')
const successDisplay = document.getElementById('success')

const newAmount = localStorage.getItem('newAmount')
const newDescription = localStorage.getItem('newDescription')

function showReceipt(){
    successDisplay.innerHTML = newAmount
    timeDisplay.innerHTML = time.time
    amountDispplay.innerHTML = newAmount
    descriptionDisplay.innerHTML = newDescription
}

doneTransfer.addEventListener('click', ()=>{
    localStorage.removeItem('newAmount')
    localStorage.removeItem('newDescription')
})

showReceipt()

