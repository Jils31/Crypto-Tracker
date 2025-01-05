// Function to format number as currency
function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number);
}

// Update the event listener for the update button
document.getElementById('update-button').addEventListener('click', function() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'flex';
});

// Function to update the portfolio value and percentage
function updatePortfolio() {
    const valueInput = document.getElementById('new-value');
    const percentageInput = document.getElementById('percentage-change');
    const portfolioValueElement = document.getElementById('portfolio-value');
    const portfolioPercentageElement = document.getElementById('portfolio-percentage');
    const modalOverlay = document.getElementById('modal-overlay');

    // Get input values
    const newValue = parseFloat(valueInput.value);
    const percentageChange = parseFloat(percentageInput.value);

    // Validate inputs
    if (isNaN(newValue) || isNaN(percentageChange)) {
        alert('Please enter valid numbers');
        return;
    }

    // Update the display
    portfolioValueElement.textContent = formatCurrency(newValue);
    
    // Format percentage with explicit if-else
    let percentageText = '';
    if (percentageChange > 0) {
        percentageText = '+' + percentageChange.toFixed(2) + '%';
    } else {
        percentageText = percentageChange.toFixed(2) + '%';
    }
    portfolioPercentageElement.textContent = percentageText;

    // Set background color with explicit if-else
    if (percentageChange >= 0) {
        portfolioPercentageElement.style.backgroundColor = '#36d339';
    } else {
        portfolioPercentageElement.style.backgroundColor = '#ff4d4d';
    }

    // Clear inputs
    valueInput.value = '';
    percentageInput.value = '';

    // Save to localStorage for persistence
    localStorage.setItem('portfolioValue', newValue);
    localStorage.setItem('portfolioPercentage', percentageChange);

    // Hide the modal
    modalOverlay.style.display = 'none';
}

// Add click event to close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        // Clear form inputs when hiding
        document.getElementById('new-value').value = '';
        document.getElementById('percentage-change').value = '';
    }
});

// Load saved values on page load with explicit if-else
window.addEventListener('load', () => {
    const savedValue = localStorage.getItem('portfolioValue');
    const savedPercentage = localStorage.getItem('portfolioPercentage');

    if (savedValue && savedPercentage) {
        const portfolioValueElement = document.getElementById('portfolio-value');
        const portfolioPercentageElement = document.getElementById('portfolio-percentage');
        const parsedPercentage = parseFloat(savedPercentage);

        portfolioValueElement.textContent = formatCurrency(parseFloat(savedValue));
        
        // Format percentage with explicit if-else
        let percentageText = '';
        if (parsedPercentage > 0) {
            percentageText = '+' + parsedPercentage.toFixed(2) + '%';
        } else {
            percentageText = parsedPercentage.toFixed(2) + '%';
        }
        portfolioPercentageElement.textContent = percentageText;

        // Set background color with explicit if-else
        if (parsedPercentage >= 0) {
            portfolioPercentageElement.style.backgroundColor = '#36d339';
        } else {
            portfolioPercentageElement.style.backgroundColor = '#ff4d4d';
        }
    }
});