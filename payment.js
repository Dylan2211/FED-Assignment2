document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardForm = document.getElementById('creditCardForm');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            creditCardForm.classList.toggle('active', this.checked);
        });
    });
});