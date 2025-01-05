
  
  // Function to fetch and render data
  function fetchAndRenderGlobalData() {
    fetch('https://api.coinpaprika.com/v1/global')
      .then(res => res.json())
      .then(data => {
        const globalData = {
          marketCapUsd: data.market_cap_usd,
          volume24hUsd: data.volume_24h_usd,
          bitcoinDominance: data.bitcoin_dominance_percentage,
          cryptocurrenciesCount: data.cryptocurrencies_number,
          marketCapChange24h: data.market_cap_change_24h
        };
  
        renderGlobalData(globalData);
      })
      .catch(err => console.error('Error fetching CoinPaprika data:', err));
  }
  
  // Call the function initially
  fetchAndRenderGlobalData();
  
  // Refresh the data every 5 minutes (300,000 milliseconds)
  setInterval(fetchAndRenderGlobalData, 300000);
  
  // Function to render global data
  function renderGlobalData(globalData) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
  
    const globalElement = document.createElement('div');
    globalElement.classList.add('global-news');
  
    globalElement.innerHTML = `
      <div class="global-item">
        <h3>Total Cryptocurrencies: ${globalData.cryptocurrenciesCount}</h3>
      </div>
      <div class="global-item">
        <h3>Market Cap (USD): $${globalData.marketCapUsd.toLocaleString()}</h3>
      </div>
      <div class="global-item">
        <h3>24h Volume (USD): $${globalData.volume24hUsd.toLocaleString()}</h3>
      </div>
      <div class="global-item">
        <h3>BTC Dominance: ${globalData.bitcoinDominance.toFixed(2)}%</h3>
      </div>
      <div class="global-item">
        <h3>Market Cap Change (24h): ${globalData.marketCapChange24h.toFixed(2)}%</h3>
      </div>
    `;
  
    newsContainer.appendChild(globalElement);
  }
  