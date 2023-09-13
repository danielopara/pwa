const showOnlineBalance = document.getElementById('onlineBal')
const requestMoney = document.getElementById('requestMoney')
const getMoney = document.getElementById('getMoney')

function onlineBalance(){
    fetch("http://localhost:2020/getOnlineBalance",{
        method : 'Get',
        headers : {'Content-Type' : 'application/json'}
    }).then(res=>res.json())
    .then(data=>{
        showOnlineBalance.innerHTML = `₦ ${data}`
        console.log(`Balance : ${[data]}`)
        
    }).catch(err=>{
        console.log(err)
    })
}

function moneyRequest(){
    const money = requestMoney.value 
    return money
}

getMoney.addEventListener('click', (e)=>{
    e.preventDefault()
    fetch("http://localhost:2020/fundOffline", {
            // mode : 'no-cors',
            method :"Post",
            headers : {'Content-Type' : "application/json"},
            body : JSON.stringify({money : parseInt(moneyRequest())})
        }).then(res=>res.json())
        .then(data=>{
            localStorage.setItem('newMoney' , moneyRequest())
            console.log(data)
            window.location.href ='offline-wallet-success.html'
        }).catch(err=>{
            console.log(err)
        })
        
})



window.onload = onlineBalance()