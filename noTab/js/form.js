const form = document.querySelector(".feedback");
const formInputs = document.querySelectorAll(".js_input");

form.onsubmit = function() {
    const emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    formInputs.forEach(function(input) {
        if (input.value === '') {
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    });

    if (emptyInputs.length !== 0) {
        return false;
    };
};