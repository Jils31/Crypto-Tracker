document.addEventListener('DOMContentLoaded', function () {
  const cryptoselect = document.getElementById('cryptoselect');
  const ctx = document.getElementById('priceChart').getContext('2d');
  let chart;

  function fetchHistoricalPrices(crypto) {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(data => {
        const prices = data.prices;
        const labels = prices.map(price => {
          const date = new Date(price[0]);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        });
        const priceData = prices.map(price => price[1]);

        if (chart) {
          chart.destroy(); // Destroy the previous chart instance
        }

        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: `${crypto.charAt(0).toUpperCase() + crypto.slice(1)} Price (USD)`,
              data: priceData,
              borderColor: '#36d390',
              borderWidth: 4,
              fill: true,
              tension: 0.4,
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Date',
                  color: 'white'
                },
                ticks: {
                  color: 'white',  // Custom color for the x-axis ticks
                  autoSkip: true,
                  maxTicksLimit: 10
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Price (USD)',
                  color: 'white'
                },
                ticks: {
                  color: 'white',  // Custom color for the y-axis ticks
                  callback: (value) => `$${value.toLocaleString()}`
                }
              }
            },
            plugins: {
              
              tooltip: {
                callbacks: {
                  label: (context) => `$${context.parsed.y.toLocaleString()}`
                }
              }
            }
          }
        });
      })
      .catch(err => console.error('Failed to fetch historical data:', err));
  }

  // Initial fetch for the default selected cryptocurrency
  fetchHistoricalPrices(cryptoselect.value);

  // Add event listener to the dropdown to fetch data based on selection
  cryptoselect.addEventListener('change', (event) => {
    fetchHistoricalPrices(event.target.value);
  });
});
