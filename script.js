"var toggleButton = document.getElementById('toggle-button');\r\nvar resetButton = document.getElementById('reset-button');\r\nvar balanceAmountElement = document.getElementById('balance-amount');\r\nvar balanceAsteriskElement = document.getElementById('balance-asterisk');\r\n\r\ntoggleButton.addEventListener('click', function() {\r\n  balanceAmountElement.classList.toggle('hidden');\r\n  balanceAsteriskElement.classList.toggle('hidden');\r\n  toggleButton.classList.toggle('hidden');\r\n  resetButton.classList.toggle('hidden');\r\n});\r\n\r\nresetButton.addEventListener('click', function() {\r\n  balanceAmountElement.classList.toggle('hidden');\r\n  balanceAsteriskElement.classList.toggle('hidden');\r\n  toggleButton.classList.toggle('hidden');\r\n  resetButton.classList.toggle('hidden');\r\n});\r\n"