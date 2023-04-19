// Get the input element and warning message element for mint
const mintInput = document.getElementById("mint_amount");
const mintWarning = document.getElementById("mint_amount_warning");

// Add an event listener for input mint events
mintInput.addEventListener("input", () => {
  // Get the input value
  let mintValue = mintInput.value;

  // Remove non-digit characters
  mintValue = mintValue.replace(/[^0-9]/g, "");

  // Show or hide the warning message
  if (mintValue.length !== mintInput.value.length) {
    mintWarning.style.display = "block";
  } else {
    mintWarning.style.display = "none";
  }

  // Update the input value
  mintInput.value = mintValue;
});
/////////////////////////////////////////////////////////////////////
// Get the input element and warning message element for transfer
const transferInput = document.getElementById("transfer_amount");
const transferWarning = document.getElementById("transfer_amount_warning");

// Add an event listener for input transfer events
transferInput.addEventListener("input", () => {
  // Get the input value
  let transferValue = transferInput.value;

  // Remove non-digit characters
  transferValue = transferValue.replace(/[^0-9]/g, "");

  // Show or hide the warning message
  if (transferValue.length !== transferInput.value.length) {
    transferWarning.innerText = "Please enter digits only";
    transferWarning.style.display = "block";
  } else {
    transferWarning.style.display = "none";
  }

  // Update the input value
  transferInput.value = transferValue;
});
/////////////////////////////////////////////////////////////////////
// Get the input element and warning message element for burn
const burnInput = document.getElementById("burn_amount");
const burnWarning = document.getElementById("burn_amount_warning");

// Add an event listener for input burn events
burnInput.addEventListener("input", () => {
  // Get the input value
  let burnValue = burnInput.value;

  // Remove non-digit characters
  burnValue = burnValue.replace(/[^0-9]/g, "");

  // Show or hide the warning message
  if (burnValue.length !== burnInput.value.length) {
    burnWarning.innerText = "Please enter digits only";
    burnWarning.style.display = "block";
  } else {
    burnWarning.style.display = "none";
  }

  // Update the input value
  burnInput.value = burnValue;
});
