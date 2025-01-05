const ans = document.querySelector('.converted-answer')
const amountInput = document.querySelector('#amount')
const cryptoSelect = document.querySelector('.crypto1')
const currencySelect = document.querySelector('.currency1')

// ... existing swap code ...

// Object to store current crypto prices
let cryptoPrices = {}

// Fetch crypto prices
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tron,tether,dogecoin&vs_currencies=usd,inr,eur,aed')
        const data = await response.json()
        cryptoPrices = {
            'BTC': data.bitcoin,
            'ETH': data.ethereum,
            'TRX': data.tron,
            'USDT': data.tether,
            'DogeCoin': data.dogecoin
        }
    } catch (error) {
        console.error('Error fetching prices:', error)
    }
}

// Convert currency function
function convertCurrency() {
    const amount = parseFloat(amountInput.value)
    const fromCrypto = cryptoSelect.value
    const toCurrency = currencySelect.value.split(' ')[0].toLowerCase()
    
    if (!amount || !cryptoPrices[fromCrypto]) {
        ans.textContent = ''
        return
    }

    let result
    if (toCurrency === 'usd') {
        result = amount * cryptoPrices[fromCrypto].usd
    } else if (toCurrency === 'inr') {
        result = amount * cryptoPrices[fromCrypto].inr
    } else if (toCurrency === 'euro') {
        result = amount * cryptoPrices[fromCrypto].eur
    } else if (toCurrency === 'aed') {
        result = amount * cryptoPrices[fromCrypto].aed
    }

    ans.textContent = `${result.toFixed(2)} ${toCurrency.toUpperCase()}`
    ans.style.marginLeft = '-4px'
    ans.style.fontSize = '20px'
}

// Event listeners
amountInput.addEventListener('input', convertCurrency)
cryptoSelect.addEventListener('change', convertCurrency)
currencySelect.addEventListener('change', convertCurrency)

// Initial price fetch
fetchCryptoPrices()
// Update prices every minute
setInterval(fetchCryptoPrices, 60000)

// Add swap functionality
// const swapIcon = document.querySelector('#swapIcon')

// function swapCurrencies() {
//     // Get current values before swap
//     const amount = parseFloat(amountInput.value)
//     const fromCrypto = cryptoSelect.value
//     const toCurrency = currencySelect.value.split(' ')[0]
    
//     // If there's no amount, just swap the dropdowns
//     if (!amount) {
//         return
//     }

//     // Calculate the reverse conversion
//     let newAmount
//     if (cryptoPrices[fromCrypto]) {
//         // If converting from crypto to fiat
//         const currentFiat = cryptoPrices[fromCrypto][toCurrency.toLowerCase()]
//         newAmount = amount * currentFiat
//     } else {
//         // If converting from fiat to crypto
//         const cryptoPrice = cryptoPrices[toCurrency][fromCrypto.toLowerCase()]
//         newAmount = amount / cryptoPrice
//     }
    
//     amountInput.value = newAmount.toFixed(8)
//     convertCurrency()
// }

// // Add event listener for swap icon
// swapIcon.addEventListener('click', swapCurrencies)

