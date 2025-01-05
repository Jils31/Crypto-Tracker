// Add event listener for the update orders button
document.getElementById('update-orders').addEventListener('click', function() {
    const ordersModal = document.getElementById('orders-modal');
    ordersModal.style.display = 'flex';
});

// Function to update orders
function updateOrders() {
    // Get input values
    const totalOrders = parseInt(document.getElementById('new-total-orders').value);
    const executedOrders = parseInt(document.getElementById('new-executed-orders').value);

    // Validate inputs
    if (isNaN(totalOrders) || isNaN(executedOrders)) {
        alert('Please enter valid numbers');
        return;
    }

    // Validate that executed orders don't exceed total orders
    if (executedOrders > totalOrders) {
        alert('Executed orders cannot exceed total orders');
        return;
    }

    // Update the display
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('executed-orders').textContent = executedOrders;

    // Save to localStorage
    localStorage.setItem('total-orders', totalOrders);
    localStorage.setItem('executed-orders', executedOrders);

    // Hide the modal and clear inputs
    const ordersModal = document.getElementById('orders-modal');
    ordersModal.style.display = 'none';
    clearOrderInputs();
}

// Function to clear inputs
function clearOrderInputs() {
    document.getElementById('new-total-orders').value = '';
    document.getElementById('new-executed-orders').value = '';
}

// Close modal when clicking outside
document.getElementById('orders-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        clearOrderInputs();
    }
});

// Load saved values on page load
window.addEventListener('load', () => {
    const totalOrders = localStorage.getItem('total-orders');
    const executedOrders = localStorage.getItem('executed-orders');

    if (totalOrders) {
        document.getElementById('total-orders').textContent = totalOrders;
    }
    if (executedOrders) {
        document.getElementById('executed-orders').textContent = executedOrders;
    }
});

