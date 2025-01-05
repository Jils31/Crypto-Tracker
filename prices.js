// Function to fetch and update prices
function fetchCryptoPrices() {
  const coinIds = ['bitcoin', 'ethereum', 'tether', 'tron', 'binancecoin', 'solana', 'ripple'];

  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Update the table with prices
      data.forEach(coin => {
        const coinId = coin.id;
        const price = coin.current_price;

        // Map coin IDs to corresponding table cell IDs
        const priceCellId = {
          bitcoin: 'btc-price',
          ethereum: 'eth-price',
          tether: 'usdt-price',
          tron: 'trx-price',
          binancecoin: 'bnb-price',
          solana: 'sol-price',
          ripple: 'xrp-price',
        }[coinId];

        // Update the table cell
        if (priceCellId) {
          const element = document.getElementById(priceCellId);
          element.innerText = `$${price.toFixed(2)}`;
          element.style.color = '#36d390'; // Bright orange color
          element.style.fontWeight = 'bold';
        }
      });
    })
    .catch(error => {
      console.error('Failed to fetch prices:', error);
    });
}

// Fetch prices initially
fetchCryptoPrices();

// Update prices every 1 day (24 hours = 86400000 milliseconds)
setInterval(fetchCryptoPrices, 86400000);
