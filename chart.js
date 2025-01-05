const ctx1 = document.getElementById("myChart").getContext("2d");

// Function to fetch data from the Binance API
async function fetchMarketData() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await response.json();

    // Extract relevant fields (e.g., `symbol` and `priceChangePercent`)
    const labels = data.slice(0, 8).map((item) => item.symbol); // Top 8 symbols
    const priceChanges = data.slice(0, 8).map((item) => parseFloat(item.priceChangePercent));

    // Update the chart with the real data
    updateChart(labels, priceChanges);
  } catch (error) {
    console.error("Error fetching market data:", error);
  }
}

// Function to update the chart
function updateChart(labels, data) {
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: labels, // Updated with real-time data
      datasets: [
        {
          label: "24h Price Change (%)",
          data: data, // Updated with real-time data
          borderColor: "#00FFAB",
          borderWidth: 5,
          fill: true,
          backgroundColor: "rgba(0, 255, 171, 0.1)",
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#ffffff",
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.raw.toFixed(2)}%`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#fff",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#fff",
            callback: function (value) {
              return `${value}%`;
            },
          },
        },
      },
    },
  });
}

// Fetch and visualize the data when the page loads
fetchMarketData();


const ctx2 = document.getElementById("gradientChart").getContext("2d");

// Create the linear gradient
const gradient = ctx2.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "rgba(255, 167, 38, 0.4)"); // Light orange at top
gradient.addColorStop(1, "rgba(85, 10, 205, 0.1)"); // Purple fade at bottom

// Chart.js configuration
new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Balance Trend",
        data: [3, 4, 5, 7, 5, 8],
        borderColor: "#ffa726", // Orange border line
        borderWidth: 4,
        backgroundColor: gradient, // Set the gradient here
        fill: true, // Enable background filling
        tension: 0.4, // Smooth curves
        pointHoverRadius: 0,
        pointRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      // Hide the legend
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
});
