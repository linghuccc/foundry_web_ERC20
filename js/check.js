function inputAmountValidation(input, warning) {
  input.addEventListener("input", () => {
    let value = input.value;
    value = value.replace(/[^0-9.]/g, "");

    // Check for valid numerical input
    if (
      value.length !== input.value.length ||
      value.split(".").filter((part) => part !== "").length > 2 ||
      value.startsWith(".")
    ) {
      warning.innerText = "Please enter a valid number";
      warning.style.display = "block";
    } else {
      warning.style.display = "none";
    }

    input.value = value;
  });
}

// Set input validation for mint
const mintInputElement = document.getElementById("mint_amount");
const mintWarningElement = document.getElementById("mint_amount_warning");
inputAmountValidation(mintInputElement, mintWarningElement);

// Set input validation for transfer
const transferInputElement = document.getElementById("transfer_amount");
const transferWarningElement = document.getElementById(
  "transfer_amount_warning"
);
inputAmountValidation(transferInputElement, transferWarningElement);

// Set input validation for burn
const burnInputElement = document.getElementById("burn_amount");
const burnWarningElement = document.getElementById("burn_amount_warning");
inputAmountValidation(burnInputElement, burnWarningElement);
