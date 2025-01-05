document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('orderbook-modal');
    const updateBtn = document.getElementById('update-orderbook');
    
    // Show modal when update button is clicked
    updateBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        
        // Reset input fields
        const buyInput = document.getElementById('buy-orders');
        const sellInput = document.getElementById('sell-orders');
        
        buyInput.value = '';
        sellInput.value = '';
        
        buyInput.placeholder = 'Enter number of buy orders';
        sellInput.placeholder = 'Enter number of sell orders';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Load saved values on page load
    const savedBuyOrders = localStorage.getItem('buyOrders');
    const savedSellOrders = localStorage.getItem('sellOrders');
    
    if (savedBuyOrders) {
        document.getElementById('buy-orders-count').textContent = savedBuyOrders;
    }
    if (savedSellOrders) {
        document.getElementById('sell-orders-count').textContent = savedSellOrders;
    }
});

function updateOrderBook() {
    const buyOrders = document.getElementById('buy-orders').value;
    const sellOrders = document.getElementById('sell-orders').value;
    
    if (buyOrders === '' && sellOrders === '') {
        alert('Please enter at least one value');
        return;
    }
    
    // Update the displayed values
    if (buyOrders !== '') {
        document.getElementById('buy-orders-count').textContent = buyOrders;
        localStorage.setItem('buyOrders', buyOrders);
    }
    
    if (sellOrders !== '') {
        document.getElementById('sell-orders-count').textContent = sellOrders;
        localStorage.setItem('sellOrders', sellOrders);
    }
    
    // Close the modal
    document.getElementById('orderbook-modal').style.display = 'none';
    
    // Update the chart if it exists
    if (typeof updateGradientChart === 'function') {
        updateGradientChart();
    }
}
