// Vars
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// Listen event
document.querySelector('#loan-form').addEventListener('submit', function(e){
    // hide results
    document.querySelector('#results').style.display = 'none';

    // show loading
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResult, 2000);

    e.preventDefault();
});

function calculateResult(){
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);

        // show result
        document.querySelector('#results').style.display = 'block';

        // hide loading
        document.querySelector('#loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

// Show error
function showError(error){
    // show result
    document.querySelector('#results').style.display = 'none';

    // hide loading
    document.querySelector('#loading').style.display = 'none';

    // create a div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}