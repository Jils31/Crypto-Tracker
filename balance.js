// Get balance modal elements
const balanceModal = document.getElementById('balance-modal');
const updateBalanceBtn = document.getElementById('update-balance');
const totalBalance = document.getElementById('total-balance');
const incomeValue = document.getElementById('income-value');
const expenseValue = document.getElementById('expense-value');

// Add event listener for update balance button
updateBalanceBtn.addEventListener('click', () => {
    balanceModal.style.display = 'flex';
});

// Close modal when clicking outside
balanceModal.addEventListener('click', (e) => {
    if (e.target === balanceModal) {
        balanceModal.style.display = 'none';
    }
});

// Function to update balance
function updateBalance() {
    const newBalance = document.getElementById('new-balance').value;
    const newIncome = document.getElementById('new-income').value;
    const newExpenses = document.getElementById('new-expenses').value;

    if (newBalance) {
        totalBalance.textContent = `$ ${parseFloat(newBalance).toFixed(2)}`;
    }
    if (newIncome) {
        incomeValue.textContent = `$${parseFloat(newIncome).toFixed(2)}`;
    }
    if (newExpenses) {
        expenseValue.textContent = `$${parseFloat(newExpenses).toFixed(2)}`;
    }

    // Clear inputs
    document.getElementById('new-balance').value = '';
    document.getElementById('new-income').value = '';
    document.getElementById('new-expenses').value = '';

    // Close modal
    balanceModal.style.display = 'none';
}
