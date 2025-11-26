const contactUsBtn = document.querySelector(".contactUs");
const contactSec = document.querySelector(".contactSec");
const submitBtn = document.querySelector(".submitBtn");

const allInputs = document.querySelectorAll(".rowForm input");

allInputs.forEach((input) => {
  input.addEventListener("input", function () {
    let pattern = new RegExp(input.dataset.regex);
    if (pattern.test(input.value)) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      checkValidation();
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
  });
});

function checkValidation() { // Function: Check all inputs validity and enable submit button if valid
  let allvalid = true;
  allInputs.forEach((input) => {
    let regex = new RegExp(input.dataset.regex);
    if (!regex.test(input.value)) {
      allvalid = false;
    }
  });
  if (allvalid) {
    submitBtn.classList.remove("disabled");
  }
}

export{submitBtn , contactSec , contactUsBtn }