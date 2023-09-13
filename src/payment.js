const payment = document.getElementById('payment')
const genarate = document.getElementById('generate')
const classification = document.getElementById('inputField')

genarate.addEventListener('click', (e)=>{

    const amount = payment.amount.value
    const description = payment.description.value
    const classText = classification.value

    localStorage.setItem('amount', amount)
    localStorage.setItem('description', description)
    localStorage.setItem('classification', classText)
})