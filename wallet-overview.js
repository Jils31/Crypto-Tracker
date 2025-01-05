// Get DOM elements
const walletModal = document.getElementById('wallet-modal');
const updateWalletBtn = document.getElementById('update-wallet');
const walletInputs = document.getElementById('wallet-inputs');
const cryptoDetailsContainer = document.querySelector('.crypto-details');
const walletChart = document.getElementById('walletChart');
let walletChartInstance = null;

// Color mappings for different cryptocurrencies
const cryptoColors = {
    BTC: { background: '#1abc9c', hover: '#16a085' },
    ETH: { background: '#3498db', hover: '#2980b9' },
    TRX: { background: '#f39c12', hover: '#e67e22' },
    USDT: { background: '#9b59b6', hover: '#8e44ad' },
    BNB: { background: '#e74c3c', hover: '#c0392b' }
};

// Initial data for the wallet
const initialWalletData = {
    BTC: 2500.00,
    ETH: 1800.00,
    USDT: 1000.00
};

// Function to initialize the wallet on page load
function initializeWallet() {
    updateCryptoDetails(initialWalletData);
    updateWalletChart(initialWalletData);
}

// Show modal when update button is clicked
updateWalletBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
});

// Close modal when clicking outside
walletModal.addEventListener('click', (e) => {
    if (e.target === walletModal) {
        walletModal.style.display = 'none';
    }
});

// Function to add more cryptocurrency input fields
function addMoreCrypto() {
    const walletInputs = document.getElementById('wallet-inputs');
    const newGroup = document.createElement('div');
    newGroup.className = 'wallet-input-group';
    newGroup.innerHTML = `
        <select class="crypto-select">
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="TRX">Tron (TRX)</option>
            <option value="USDT">Tether (USDT)</option>
            <option value="BNB">Binance (BNB)</option>
        </select>
        <input type="number" class="crypto-amount" placeholder="Enter amount in USD" step="0.01" min="0">
    `;
    walletInputs.appendChild(newGroup);
}

function removeCrypto() {
    const walletInputs = document.getElementById('wallet-inputs');
    const inputGroups = walletInputs.getElementsByClassName('wallet-input-group');
    if (inputGroups.length > 1) {
        inputGroups[inputGroups.length - 1].remove();
    }
}

// Function to update wallet
function updateWallet() {
    const inputs = document.querySelectorAll('.wallet-input-group');
    const walletData = {};
    
    // Collect data from inputs
    inputs.forEach(input => {
        const crypto = input.querySelector('.crypto-select').value;
        const amount = parseFloat(input.querySelector('.crypto-amount').value) || 0;
        if (amount > 0) {
            walletData[crypto] = amount;
        }
    });

    // Update crypto details display
    updateCryptoDetails(walletData);
    
    // Update chart
    updateWalletChart(walletData);
    
    // Clear inputs and close modal
    walletInputs.innerHTML = '';
    addMoreCrypto(); // Add one empty input group
    walletModal.style.display = 'none';
}

// Function to update crypto details display
function updateCryptoDetails(data) {
    cryptoDetailsContainer.innerHTML = '';
    
    Object.entries(data).forEach(([crypto, amount]) => {
        const cryptoDiv = document.createElement('div');
        cryptoDiv.className = 'crypto';
        cryptoDiv.innerHTML = `
            <div style="background-color: #43476d">
                <span class="dot" style="background-color: ${cryptoColors[crypto].background}"></span>
                <span class="span">${crypto}</span>
            </div>
            <div style="background-color: #43476d">
                <span class="amount">$${amount.toFixed(2)}</span>
            </div>
        `;
        cryptoDetailsContainer.appendChild(cryptoDiv);
    });
}

// Function to update wallet chart
function updateWalletChart(data) {
    if (walletChartInstance) {
        walletChartInstance.destroy();
    }

    const ctx = document.getElementById('walletChart').getContext('2d');
    walletChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: Object.keys(data).map(crypto => cryptoColors[crypto].background),
                hoverBackgroundColor: Object.keys(data).map(crypto => cryptoColors[crypto].hover),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `$${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

// Initialize with empty input
addMoreCrypto();

document.addEventListener('DOMContentLoaded', initializeWallet);
