// Format currency function
function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number);
}

// Add event listener for the summary update button
document.getElementById('update-summary').addEventListener('click', function() {
    const summaryModal = document.getElementById('summary-modal');
    summaryModal.style.display = 'flex';
});

function updateSummary() {
    // Get all input values
    const sales = parseFloat(document.getElementById('new-sales').value);
    const trades = parseInt(document.getElementById('new-trades').value);
    const pools = parseInt(document.getElementById('new-pools').value);
    const returnPercentage = parseFloat(document.getElementById('new-return').value);

    // Validate inputs
    if (isNaN(sales) || isNaN(trades) || isNaN(pools) || isNaN(returnPercentage)) {
        alert('Please enter valid numbers for all fields');
        return;
    }

    // Get previous values from localStorage or default to 0
    const prevSales = parseFloat(localStorage.getItem('summary-sales')) || 0;
    const prevTrades = parseInt(localStorage.getItem('summary-trades')) || 0;
    const prevPools = parseInt(localStorage.getItem('summary-pools')) || 0;
    const prevReturn = parseFloat(localStorage.getItem('summary-return')) || 0;

    // Update the display values
    document.getElementById('total-sales').textContent = formatCurrency(sales);
    document.getElementById('trade-count').textContent = trades;
    document.getElementById('active-pools').textContent = pools;
    document.getElementById('avg-return').textContent = `${returnPercentage}%`;

    // Update arrow icons based on value comparisons
    const icons = document.querySelectorAll('.assets i');
    
    // Sales comparison
    icons[0].className = sales >= prevSales ? 'fa-solid fa-up-long' : 'fa-solid fa-down-long';
    icons[0].style.color = sales >= prevSales ? '#36d339' : '#ff4d4d';

    // Trades comparison
    icons[1].className = trades >= prevTrades ? 'fa-solid fa-up-long' : 'fa-solid fa-down-long';
    icons[1].style.color = trades >= prevTrades ? '#36d339' : '#ff4d4d';

    // Pools comparison
    icons[2].className = pools >= prevPools ? 'fa-solid fa-up-long' : 'fa-solid fa-down-long';
    icons[2].style.color = pools >= prevPools ? '#36d339' : '#ff4d4d';

    // Return comparison
    icons[3].className = returnPercentage >= prevReturn ? 'fa-solid fa-up-long' : 'fa-solid fa-down-long';
    icons[3].style.color = returnPercentage >= prevReturn ? '#36d339' : '#ff4d4d';

    // Save new values to localStorage
    localStorage.setItem('summary-sales', sales);
    localStorage.setItem('summary-trades', trades);
    localStorage.setItem('summary-pools', pools);
    localStorage.setItem('summary-return', returnPercentage);

    // Hide the modal
    document.getElementById('summary-modal').style.display = 'none';
    
    // Clear the form
    document.getElementById('new-sales').value = '';
    document.getElementById('new-trades').value = '';
    document.getElementById('new-pools').value = '';
    document.getElementById('new-return').value = '';
}

// Close modal when clicking outside
document.getElementById('summary-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        // Clear form inputs
        document.getElementById('new-sales').value = '';
        document.getElementById('new-trades').value = '';
        document.getElementById('new-pools').value = '';
        document.getElementById('new-return').value = '';
    }
});

// Load saved values and set arrows on page load
window.addEventListener('load', () => {
    const sales = localStorage.getItem('summary-sales');
    const trades = localStorage.getItem('summary-trades');
    const pools = localStorage.getItem('summary-pools');
    const returnPercentage = localStorage.getItem('summary-return');

    if (sales) {
        document.getElementById('total-sales').textContent = formatCurrency(parseFloat(sales));
    }
    if (trades) {
        document.getElementById('trade-count').textContent = trades;
    }
    if (pools) {
        document.getElementById('active-pools').textContent = pools;
    }
    if (returnPercentage) {
        document.getElementById('avg-return').textContent = `${returnPercentage}%`;
    }

    // Set initial arrow colors based on positive/negative values
    const icons = document.querySelectorAll('.assets i');
    icons.forEach(icon => {
        icon.style.color = '#36d339'; // Default to green for initial state
        icon.className = 'fa-solid fa-up-long';
    });
});