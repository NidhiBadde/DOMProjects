// Listen to Submit
document.getElementById('loan-form').addEventListener('submit' , function(e){

    // Hide results
    document.getElementById('results').style.display = 'none';


    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults , 2000);
    
    e.preventDefault();
});


// Claculate results
function calculateResults(){

    // UI variables

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // compute montly payment 
    const x = Math.pow(1 + calculatedInterest , calculatedPayment);
    const monthly = (principle*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayment)- principle).toFixed(2);

        // Allowing calculated results to display
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showerror('Please check the numbers entered');
        
    }



    
}

// Show error function

function showerror(error){

    // hide results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
// create div
    const errordiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errordiv.className = 'alert alert-danger';

    // create text node and append to div

    errordiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errordiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError , 3000);

}

//  clear error

function clearError(){
    document.querySelector('.alert').remove();
}