'use strict'; // strict mode for error detection

//variables here
const form = document.querySelector('.user-form');
const userInputs = document.querySelectorAll('.user-form__txtinput');
const checkBox = document.querySelector('.user-form__consent-input');
const radioButtons = document.querySelectorAll('.user-form__option-input');
const radioError = document.querySelector('.radio-error__label');
const labelHide = document.querySelector('.user-form__chklabel');

const email = document.getElementById('email');


//function for email validation
function isValidEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }
  
const userInput = function(){
    let isValidation = true; 
    //using foreach method for iterating over user inputs not returining anything 
    userInputs.forEach(input => {
        const label = input.nextElementSibling;
        //for input empty
        if (input.value === '' || input.value === undefined) {
            label.classList.remove('error__message');
            isValidation = false;
          } else {
            label.classList.add('error__message');
          }

         
          //for email 
          if (input.type === 'email' && !isValidEmail(input.value)) {
            label.classList.remove('error__message');
            label.textContent = 'Please enter a valid email address';
            isValidation = false;
          }
         
    })
    return isValidation
}

/*
 useremail creating another one for valid email type
 const emailValidation = function(){
 } */


//function expression for checkbox validation
const checkboxValidation = function(){
    if (!checkBox.checked) {
        labelHide.classList.remove('error__message');
        return false;
      } else {
        labelHide.classList.add('error__message');
        return true;
      }
}



/*Array.from for create an array  an iterable object and some
 inbuilt method for if any of this array fulfilling the requirement then do as per code
 */
const radiobtnValidation = function(){
    const isRadioButtonSelected = Array.from(radioButtons).some(radioButton => radioButton.checked);

    if (!isRadioButtonSelected) {
      radioError.classList.remove('error__message');
      return false;
    } else {
      radioError.classList.add('error__message');
      return true;
    }
}

//main validation function expresstion , for calling above three function here
const validation = function(){
    const inputValidation = userInput();
    const  chkboxValidation = checkboxValidation();
    const radioValidaton = radiobtnValidation();

    return inputValidation && chkboxValidation && radioValidaton;

}

//**************************** form submission here **********************/
form?.addEventListener("submit", function (ev) {
    ev.preventDefault();
  
    //only go in to this if validation ok 
    if (validation()) {
      try {
        const formData = new FormData(form);
        let object = {};
  
        formData.forEach((value, key) => {
          object[key] = value;
        });
  
        let json = JSON.stringify(object);
        console.log(json);
      } catch (err) {
        console.error(` ${err}`);
      }
    } else {
      console.log('Please enter the valid/mandatory input');
    }
  });
  




