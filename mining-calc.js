function calculateProfit() {
    // Get input values
    const hashrate = parseFloat(document.getElementById('hashrate').value);
    const power = parseFloat(document.getElementById('power').value) / 1000;  // Convert to kW
    const cost = parseFloat(document.getElementById('cost').value);
    const price = parseFloat(document.getElementById('price').value);
   

    // Input validation
    if (!hashrate || !power || !cost || !price) {
        document.getElementById('result').innerText = 'Please fill in all fields';
        return;
    }

    // Calculate daily mining profit
    try {
        const dailyReward = (hashrate  * 86400) / ( Math.pow(2, 32));
        const dailyRevenue = dailyReward * price;
        const dailyPowerCost = power * cost * 24;
        const profit = dailyRevenue - dailyPowerCost;

        // Format the result with proper currency formatting
        const formattedProfit = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(profit);

        // Display detailed results
        document.getElementById('result').innerHTML = `
            Daily Mining Revenue: ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(dailyRevenue)}<br>
            Daily Power Cost: ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(dailyPowerCost)}<br>
            Estimated Daily Profit: ${formattedProfit}
        `;
    } catch (error) {
        document.getElementById('result').innerText = 'Error in calculation. Please check your inputs.';
    }
}

// Add event listeners to all inputs for real-time calculation
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['hashrate', 'power', 'cost', 'price'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateProfit);
    });
});
