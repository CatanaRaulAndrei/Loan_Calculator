// Listen for submit button
document
  .getElementById("loan-form")
  .addEventListener("submit", function(event_param) {
    // Hide Results
    document.getElementById("results").style.display = "none";
    // Show loader when button calculate is clicked
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResults, 2000);
    event_param.preventDefault();
  });
// Calculate Results function
function calculateResults() {
  // UI variables
  const amount_UI = document.getElementById("amount");
  const interest_UI = document.getElementById("interest");
  const yearsOfRepay_UI = document.getElementById("years");
  const monthlyPayment_UI = document.getElementById("monthly-payment");
  const totalPayment_UI = document.getElementById("total-payment");
  const totalInterest_UI = document.getElementById("total-interest");
   if(amount_UI.value<0){
    showError("Please check your numbers");
   }
   else if(interest_UI.value<0){
    showError("Please check your numbers");
   }
   else if(yearsOfRepay_UI.value<0){
    showError("Please check your numbers"); 
   }
    else{
    // principal is amount converted to float
    const principal = parseFloat(amount_UI.value);
    // calculated_interest is interest converted to float
    const calculated_interest = parseFloat(interest_UI.value) / 100 / 12;
    // calculated_payments is yearsOfRepay converted to float
    const calculated_payments = parseFloat(yearsOfRepay_UI.value) * 12;
    // Compute the monthly payments
    const pow_calculated = Math.pow(
      1 + calculated_interest,
      calculated_payments
    );
    const compute_monthly_payment =
      (principal * pow_calculated * calculated_interest) / (pow_calculated - 1);
    // Check compute_monthly_payment to see if it is a finite value
    if (isFinite(compute_monthly_payment)) {
      monthlyPayment_UI.value = compute_monthly_payment.toFixed(2);
      totalPayment_UI.value = (compute_monthly_payment * calculated_payments).toFixed(2);
      totalInterest_UI.value = (compute_monthly_payment * calculated_payments - principal).toFixed(2);
      // Show Results
      document.getElementById("results").style.display = "block";
      // Hide loader
      document.getElementById("loading").style.display = "none";
    } else {
      showError("Please check your numbers");
    }
   }
}
// showError function
function showError(message) {
  // Hide loader
  document.getElementById("results").style.display = "none";
  // Hide Results
  document.getElementById("loading").style.display = "none";
  // Create a div
  const error_div = document.createElement("div");
  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // Add class
  error_div.className = "alert alert-danger";
  // Create text node and append to div
  error_div.appendChild(document.createTextNode(message));
  // Insert error above heading
  card.insertBefore(error_div, heading);
  // Clear error after 2 seconds
  setTimeout(clearError, 2000);
}
// clearError function
function clearError() {
  document.querySelector(".alert").remove();
}
