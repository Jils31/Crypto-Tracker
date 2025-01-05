document.addEventListener('DOMContentLoaded', function() {
    const depositModal = document.getElementById('wallet-balance-modal');
    const withdrawModal = document.getElementById('withdraw-modal');
    const depositBtn = document.getElementById('deposit');
    const withdrawBtn = document.getElementById('withdraw');
    
    // Deposit button functionality (existing code)
    depositBtn.addEventListener('click', function() {
        depositModal.style.display = 'flex';
        
        const btcInput = document.getElementById('btc-amount');
        const usdtInput = document.getElementById('usdt-amount');
        
        btcInput.value = '';
        usdtInput.value = '';
        
        btcInput.placeholder = 'Enter BTC amount';
        usdtInput.placeholder = 'Enter USDT amount';
    });

    // Withdraw button functionality
    withdrawBtn.addEventListener('click', function() {
        withdrawModal.style.display = 'flex';
        
        const btcInput = document.getElementById('btc-withdraw');
        const usdtInput = document.getElementById('usdt-withdraw');
        
        btcInput.value = '';
        usdtInput.value = '';
        
        btcInput.placeholder = 'Enter BTC amount';
        usdtInput.placeholder = 'Enter USDT amount';
    });

    // Close modals when clicking outside
    depositModal.addEventListener('click', function(e) {
        if (e.target === depositModal) {
            depositModal.style.display = 'none';
        }
    });

    withdrawModal.addEventListener('click', function(e) {
        if (e.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
    });

    // Load saved values (existing code)
    const savedBtc = localStorage.getItem('btcBalance');
    const savedUsdt = localStorage.getItem('usdtBalance');
    
    if (savedBtc) {
        document.getElementById('btc-balance').textContent = parseFloat(savedBtc).toFixed(2);
    }
    if (savedUsdt) {
        document.getElementById('usdt-balance').textContent = parseFloat(savedUsdt).toFixed(2);
    }
});

// Existing deposit function
function updateWalletBalance() {
    const btcAmount = document.getElementById('btc-amount').value;
    const usdtAmount = document.getElementById('usdt-amount').value;
    
    document.getElementById('btc-balance').textContent = parseFloat(btcAmount).toFixed(2);
    document.getElementById('usdt-balance').textContent = parseFloat(usdtAmount).toFixed(2);
    
    document.getElementById('wallet-balance-modal').style.display = 'none';
    
    localStorage.setItem('btcBalance', btcAmount);
    localStorage.setItem('usdtBalance', usdtAmount);
}

// New withdraw function
function processWithdraw() {
    const btcWithdraw = parseFloat(document.getElementById('btc-withdraw').value) || 0;
    const usdtWithdraw = parseFloat(document.getElementById('usdt-withdraw').value) || 0;
    
    const currentBtc = parseFloat(document.getElementById('btc-balance').textContent);
    const currentUsdt = parseFloat(document.getElementById('usdt-balance').textContent);
    
    // Validate if withdrawal amount is valid
    if (btcWithdraw > currentBtc || usdtWithdraw > currentUsdt) {
        alert('Insufficient balance for withdrawal');
        return;
    }
    
    // Calculate new balances
    const newBtc = (currentBtc - btcWithdraw).toFixed(2);
    const newUsdt = (currentUsdt - usdtWithdraw).toFixed(2);
    
    // Update balances
    document.getElementById('btc-balance').textContent = newBtc;
    document.getElementById('usdt-balance').textContent = newUsdt;
    
    // Save to localStorage
    localStorage.setItem('btcBalance', newBtc);
    localStorage.setItem('usdtBalance', newUsdt);
    
    // Close modal
    document.getElementById('withdraw-modal').style.display = 'none';
}
