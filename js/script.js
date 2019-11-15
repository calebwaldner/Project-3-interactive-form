
/**********************************************************************
GLOBAL VARIABLE DECLARATIONS
**********************************************************************/

//// VARIABLE DECLARATIONS

let jobOtherTitle, //used to determine if the "other job" input element is present or not
    checkedArr, //used for storing the currently selected activities
    activityPrice=0, //used to store the currently selected activity price
    totalPrice=0, //used to store the current total price of all selected activities
    checkedActivities=0, //used to tally how many activities are currently selected
    emailHasFocus, //used to track if email input has focus
    selectedPayment; ////used to store the option element that was selected from select payment menu

//// GET ELEMENTS

const header = document.getElementsByTagName('header')[0]; //document header
const inputLabels = document.getElementsByTagName('label'); //gets all label elements
const inputElements = document.getElementsByTagName('input'); //gets all input elements
const nameInput = document.getElementById('name'); //name input element
const emailInput = document.getElementById('mail'); //email input element
const formElement = document.getElementsByTagName('form')[0]; //gets the whole form element
const basicInfoFieldSet = document.getElementById('basic-info'); //gets the basic info fieldset element
const jobSelect = document.getElementById('title'); //gets the "job role" select element 
const jobOtherInput = document.getElementById('other-title'); //gets the input element for "other job" option
const colorDiv = document.getElementById('colors-js-puns'); //gets the color div for tshirt info
const colorMenu = document.getElementById('color'); //gets the color select menu for tshirt info
const shirtThemeMenu = document.getElementById('design'); //gets the "select theme" select menu
const activitiesField = document.getElementsByClassName('activities')[0]; //gets the fieldset element for selecting an activity
const activitiesLegendElement = activitiesField.getElementsByTagName('legend')[0]; //gets the legend element for activity selection
const activitiesLabels = activitiesField.getElementsByTagName('label'); //gets the activity selection label elements
const selectPaymentMethod = document.getElementById('payment'); //gets the select menu for payment selection
const paymentOptions = selectPaymentMethod.children; //array containing option elements; 1 = credit card, 2 = paypal, 3 = bitcoin
const paymentInfoFieldset = formElement.children[3]; //gets the fieldset for payment info
const creditCardDiv = document.getElementById('credit-card'); //gets the credit card div
const CCNumInput = document.getElementById('cc-num'); //gets the cc num input element
const CCZipInput = document.getElementById('zip'); //gets the zip input element
const CCCVVInput = document.getElementById('cvv'); //gets the ccv input element
const payPalDiv = paymentInfoFieldset.children[4]; //gets the paypal div
const bitcoinDiv = paymentInfoFieldset.children[5]; //gets the bitcoin div

//// CREATE ELEMENTS

const colorOptionPlaceholder = document.createElement('option');
const activitiesTotalH2 = document.createElement('h2');



/**********************************************************************
GENERAL FUNCTIONS
**********************************************************************/

//removes an item
const removeItem = item => {
  item.remove();
}

//sets the element display style to none
const hide = element => {
  element.style.display = 'none';
}

//sets the element display style to block
const show = element => {
  element.style.display = 'block';
}

//gives element the required attribute
const requiredOn  = element => {
  element.required = true;
}

//removes the required attribute
const requiredOff  = element => {
  element.removeAttribute('required');
}

//gives element the pattern attribute
const patternOn  = (element, patternString) => {
  element.pattern = patternString;
}

//removes the pattern attribute
const patternOff  = element => {
  element.removeAttribute('pattern');
}



/**********************************************************************
RELATED TO JOB SELECTION
**********************************************************************/

//checks job select input, returns true if "other" is selected, false if not
const jobValueCheck = () => {
  let jobValue = jobSelect.value === 'other'; //if job selection is "other", store true; otherwise store false
  return jobValue;
}

//finds "other-job" input box, returns true if it's found, false if not
const jobOtherFound = () => {
  let found = jobOtherTitle; //stores string or null
  let result = found !== null ? true : false; //if found is not null, return true; if null, return false
  return result;
}

//removes the input element for "other" job option
const removeOtherTitle = () => {
  removeItem(document.getElementById('other-title'));
  jobOtherTitle = null;
}

//appends the "other" job input
const appendOtherJobInput = () => {
  basicInfoFieldSet.appendChild(jobOtherInput);
  jobOtherTitle = jobOtherInput;
}

//listens for job select box to change
jobSelect.addEventListener('change', () => {
  jobOtherFound() && removeOtherTitle(); //if jobOtherFound is true, removes jobOtherTitle box; if false, nothing
  jobValueCheck() && appendOtherJobInput(); //if jobValueCheck is true, appends "other" job text box; if false, nothing
});



/**********************************************************************
RELATED TO T-SHIRT SELECTION
**********************************************************************/

//array for all shirt color options. color, value, and theme properties are required.
const shirtColorOptionsArr = [
  {color:'Cornflower Blue', value:'cornflowerblue', theme:'js puns'},
  {color:'Dark Slate Grey', value:'darkslategrey', theme:'js puns'},
  {color:'Gold', value:'gold', theme:'js puns'},
  {color:'Tomato', value:'tomato', theme:'heart js'},
  {color:'Steel Blue', value:'steelblue', theme:'heart js'},
  {color:'Dim Grey', value:'dimgrey', theme:'heart js'}
];

//removes color options from HTML - though it's more simple to set display to none, removing these elements cleans up the HTML; a new list will be appended
const removeHTMLColorOptions = removeColors => {
  let list = removeColors.length;
  for (let i=0; i<list; i++) {
    removeColors.removeChild(removeColors[0]);
  }
}

//adds and selects the "placeholder" for the color menu
const addColorPlaceholder = () => {
  colorMenu.appendChild(colorOptionPlaceholder);
  colorOptionPlaceholder.innerHTML = "&larr; Please select a design";
  colorOptionPlaceholder.selected = true;
  colorOptionPlaceholder.disabled = true;
}

//adds color options from array into HTML
const addNewHTMLColorMenu = () => {
  for (let i=0; i<shirtColorOptionsArr.length; i++) {
    const colorOption = document.createElement('option');
    colorMenu.appendChild(colorOption);
    colorOption.innerHTML = shirtColorOptionsArr[i].color;
    colorOption.value = shirtColorOptionsArr[i].value;
    colorOption.theme = shirtColorOptionsArr[i].theme;
    hide(colorOption); //all options hidden by default
  }
}

//shows colors that match the shirt theme
const getColorOptions = () => {
  let selTheme = shirtThemeMenu.value; //gets theme selected
  let currentColorList = []; //empties array, staged to be stored with filtered colors
  for (let i=0; i<colorMenu.length; i++) { //loops through each color to match with theme
    if (colorMenu[i].theme == selTheme) { //if tshirt color theme matches selected theme
      show(colorMenu[i]); //then set display style to block (show it)
      currentColorList.push(colorMenu[i]); //and push color to currentColorList array
      //if browser does not support hiding option elements (such as Safari), the disabled attribute is used to prevent user from selecting options that should be hidden
      colorMenu[i].disabled = false; //these options are selectable
    } else {
      hide(colorMenu[i]); //otherwise, set display style to none (hide it)
      colorMenu[i].disabled = true; //these options are not selectable (either hidden or disabled)
    }
  }
  setSelected(currentColorList); //sets first option as selected
}

//toggles color div if shirt theme is selected
const toggleColorDiv = () => {
  if (colorMenu.value === '← Please select a design') { //if colorMenu is the placeholder
    hide(colorDiv) // then hide the color div
  } else {
    show(colorDiv); //otherwise show the color div
  }
}

//sets first option as selected or placeholder option as visible and selected
const setSelected = list => {
  if (list.length > 0) { //if there are any color options currently displayed
    list[0].selected = true; //then select the first one
  } else { //or else the placeholder is selected and visible
    show(colorOptionPlaceholder);
    colorOptionPlaceholder.selected = true;
  }
}

//listens for tshirt design select box to change
shirtThemeMenu.addEventListener('change', () => {
  getColorOptions();
  toggleColorDiv();
});



/**********************************************************************
RELATED TO REGISTER FOR ACTIVITIES
**********************************************************************/

//array holding info from activities section, uses name property to match with actvitiesLabels.
const activitiesArr = [
  {name:'all', activity:'Main Conference', price:200},
  {name:'js-frameworks', activity:'JavaScript Frameworks Workshop', date:'Tuesday', time:'9am-12pm', price:100},
  {name:'js-libs', activity:'JavaScript Libraries Workshop', date:'Tuesday', time:'1pm-4pm', price:100},
  {name:'express', activity:'Express Workshop', date:'Tuesday', time:'9am-12pm', price:100},
  {name:'node', activity:'Node.js Workshop', date:'Tuesday', time:'1pm-4pm', price:100},
  {name:'build-tools', activity:'Build tools Workshop', date:'Wednesday', time:'9am-12pm', price:100},
  {name:'npm', activity:'npm Workshop', date:'Wednesday', time:'1pm-4pm', price:100}
];

//returns true if both date and time conflict
const checkForConflict = (checkedActivity, activityArr) => {
  if (checkedArr.name !== activityArr.name) { //prevents the same activity from being returned as a conflicting activity
    if (checkedArr.date === activityArr.date && checkedArr.time === activityArr.time) { //if both date and time match
      return true; //then the conflict is true
    }
  }
}

//accepts an input to grey out and disable, for conflicting activities
const greyOut = activityName => {
  for (let i=0; i<activitiesLabels.length; i++) {
    if (activityName === activitiesLabels[i].firstElementChild.name) { //takes the name and finds the label element
      activitiesLabels[i].style.color = '#888'; //turns input label grey
      activitiesLabels[i].firstElementChild.setAttribute('disabled', ''); //disables input element
    }
  }
}

//accepts an input to change from greyOut to default
const cancelGreyOut = activityName => {
  for (let i=0; i<activitiesLabels.length; i++) {
    if (activityName === activitiesLabels[i].firstElementChild.name) { //takes the name and finds the label element
      activitiesLabels[i].style.color = '#000'; //turns input label black
      activitiesLabels[i].firstElementChild.removeAttribute('disabled', ''); //disables input element
    }
  }
}

//matches the checked element with the correct array object, stores object in global variable
const matchChecked = (checkedName, arr) => {
  for (let i=0; i<arr.length; i++) {
    if (checkedName === arr[i].name) { //if checked element name matches array object name
      checkedArr = arr[i]; //then store the array object in variable
      return;
    }
  }
}

//checks for conflicting activities and grays them out or restores default, depending on if checked or unchecked
const getConflictingElements = (checkedActivity, arr, checkedOrNot) => {
  for (let i=0; i<arr.length; i++) {
    //if checked, then find conflicting activities and grey them out, if not checked (just unchecked), then find conflicting element (currently greyed out) and restore defaults
    checkedOrNot ? checkForConflict(checkedActivity, arr[i]) && greyOut(arr[i].name) : checkForConflict(checkedActivity, arr[i]) && cancelGreyOut(arr[i].name);
  }
}

//shows activities price total if the total is more than $0
const toggleActivitiesTotal = () => {
  totalPrice <= 0 ? hide(activitiesTotalH2) : show(activitiesTotalH2);
}

//gets to price of the activity, stores in global variable
const getActivityPrice = activity => {
  activityPrice = activity.price;
  return activityPrice;
}

//if the activity was just checked (true), add activity price to total price (global variable), if unchecked, subtract activity price from total price
const updateActivityPrice = checked => {
  checked ? totalPrice += activityPrice : totalPrice -= activityPrice;
  activitiesTotalH2.innerHTML = 'Total: $' + totalPrice; //updates html
}

//counts number of checked activities, used in form validation
const getNumberChecked = checked => {
  //if true, plus one checked activity; if false, minus one
  checked ? checkedActivities += 1 : checkedActivities -= 1;
}

const boldLable = (checked, isChecked) => {
  if (isChecked === true) {
    checked.parentElement.style.fontWeight = 'bold';
  } else {
    checked.parentElement.style.fontWeight = 'normal';
  }
}

//listens for activities to be checked
activitiesField.addEventListener('change', (e) => {
  const checkedActivity = e.target; //stores checked input
  const isChecked = checkedActivity.checked; //true or false
  const checkedActivityName = checkedActivity.name; //stores checkedActivity (input element) name property
  matchChecked(checkedActivityName, activitiesArr); //matches checked activity with corresponding array element (each activity in the HTML has a matching array element in activitiesArr)
  getConflictingElements(checkedActivity, activitiesArr, isChecked); //gets conflicting activities (if any) and grays out or cancels grey out appropriately (if checked or unchecked)
  getActivityPrice(checkedArr); //get price of activity
  updateActivityPrice(isChecked); //add or subtract the activity price from total price
  toggleActivitiesTotal(); //show total if it is greater than $0
  getNumberChecked(isChecked); //counts number of checked inputs
  validateActivities(); //checks validation after changes have been made to activities selection
  boldLable(checkedActivity, isChecked);
  });



/**********************************************************************
RELATED TO PAYMENT INFO
**********************************************************************/

//hides all payment divs
const hideAllPaymentDivs = () => {
  hide(creditCardDiv);
  hide(payPalDiv);
  hide(bitcoinDiv);
}

//hides all payment divs and shows new div
const togglePaymentDiv = div => {
  hideAllPaymentDivs();
  show(div);
}

//takes two elements and gives them both the same class
const giveMatchingClass = (element1, element2, newClass) => {
  element1.className = newClass;
  element2.className = newClass;
}

//gives the payment option elements and the payment divs matching classes
const giveAllMatchingClass = () => {
  giveMatchingClass(paymentOptions[1], creditCardDiv, 'credit-card');
  giveMatchingClass(paymentOptions[2], payPalDiv, 'paypal');
  giveMatchingClass(paymentOptions[3], bitcoinDiv, 'bitcoin');
}

//shows selected payment div depending on selected option
const showSelectedPayment = () => {
  //stores the option element that was selected from select#payment element in global variable
  selectedPayment = selectPaymentMethod.options[selectPaymentMethod.selectedIndex];
  //gets list of all elements with selected class. stores the second element from list (in HTML the div is second, the option is first)
  let showDiv = document.getElementsByClassName(selectedPayment.classList[0])[1];
  togglePaymentDiv(showDiv) 
}

//listens for payment method selection
selectPaymentMethod.addEventListener('change', () => {
  showSelectedPayment();
  requiredCC(); //on or off, depending on if CC is selected payment method
});



/**********************************************************************
FORM VALIDATION
**********************************************************************/

/*
A lot of credit given to Ana Sampaio who wrote an article for The UI Files. This article was a major resource used in creating this form validation.
https://medium.com/the-ui-files/form-validation-with-javascript-4fcf4dd32846
*/

//appends and styles main error message at the top of the page, toggle based off true or false parameter
const toggleMainError = tOrF => {
  //if the document already contains the error message, then remove it. prevents duplicate error message
  document.contains(document.getElementById('main-error-message')) ? document.getElementById('main-error-message').remove() : '';
  //creates and styles div to hold error message
  const mainErrorDiv = document.createElement('div');
  mainErrorDiv.id = 'main-error-message';
  mainErrorDiv.style.color = 'white';
  mainErrorDiv.style.backgroundColor = '#fc000a';
  mainErrorDiv.style.marginTop = '1.5em';
  mainErrorDiv.style.marginBottom = '-1.8em';
  mainErrorDiv.style.width = '100%';
  mainErrorDiv.style.display = 'flex';
  mainErrorDiv.style.justifyContent = 'left';
  mainErrorDiv.style.alignItems = 'center';
  mainErrorDiv.style.padding = '10px 0 10px 30px';
  //creates and styles exclamation mark image
  //Image by Sarang (Unicode U+0021) [Public domain], via Wikimedia Commons
  const exclamationMark = document.createElement('img');
  exclamationMark.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Exclamation_encircled.svg/32px-Exclamation_encircled.svg.png';
  exclamationMark.style.width = '32px';
  exclamationMark.style.filter = 'invert(100%)';
  exclamationMark.style.marginRight = '10px';
  exclamationMark.alt = 'Exclamation encircled';
  //creates and styles error message text
  const mainErrorText = document.createElement('h3');
  mainErrorText.style.margin = '0';
  mainErrorText.textContent = 'Some fields are incorrect';
  //if true, show div; if false, remove div
  if (tOrF) {
    //appends img and h3 to div, div appended to header
    mainErrorDiv.appendChild(exclamationMark);
    mainErrorDiv.appendChild(mainErrorText);
    header.appendChild(mainErrorDiv);
  } else {
    document.getElementById('main-error-message').remove();
  }
}

//changes border to red if true, default if false
const errorHighlightBorder = (element, tOrF) => {
  if (tOrF) {
    element.style.borderColor = '#fc000a';
    element.style.borderWidth = '2px';
  } else {
    element.style.borderColor = '';
    element.style.borderWidth = '';
  }
}

//changes text color to red if true, default if false
const errorHighlightText = (element, tOrF) => {
  if (tOrF) {
    element.style.color = '#fc000a';
  } else {
    element.style.color = '';
  }
}

//takes label name as string and returns associated input label element
const getLabelElement = labelFor => {
  let label;
  for (let i=0; i<inputLabels.length; i++) {
    inputLabels[i].htmlFor === labelFor ? label = inputLabels[i] :'';
  }
  return label;
}

//takes string as parameter and returns input element with matching id
const getInputElement = labelFor => {
  let input;
  for (let i=0; i<inputElements.length; i++) {
    inputElements[i].id === labelFor ? input = inputElements[i] :'';
  }
  return input;
}

//shows and style error message inside input label elements
const showInputErrorMessage = (labelName, tOrF, message) => {
  const currentLebelElement = getLabelElement(labelName); //takes labelName parameter, finds and stores label element
  const currentInputElement = getInputElement(labelName); //takes labelName parameter, finds and stores input element
  const errorSpan = document.createElement('span'); //creates span element for appending to label element
  if (tOrF) { //if true and if there already isn't a message displaying
  
    document.contains(currentLebelElement.children[0]) ? currentLebelElement.children[0].remove() : '';

    // currentLebelElement.children[0].remove(); //remove current error message 
    currentLebelElement.appendChild(errorSpan); //append new span element
    errorSpan.innerHTML = message; //write message (parameter) in span element
  } else if (!tOrF && currentLebelElement.children.length >= 1){ //if false and if there is a child element present
    currentLebelElement.children[0].remove(); //then remove the child element (span element)
  }
  errorHighlightText(currentLebelElement, tOrF); //if true, apply "error" styling to label element; if false, remove styling
  errorHighlightBorder(currentInputElement, tOrF); //if true, apply "error" styling to input element; if false, remove styling
}

//// NAME VALIDATION

//prevents form from submitting with name input left blank
requiredOn(nameInput);

//Custom message for type of validation error
nameInput.dataset.valueMissing = ' Please include your full name.';

//if focus leaves name input while it is blank, then show invalid formatting
nameInput.addEventListener('blur', () => {
  if (!nameInput.checkValidity()) { //if checkValidity returns false (then IF statement is true)
    showInputErrorMessage('name', true, nameInput.dataset.valueMissing); //then show error message with message stored in dataset property
  } else {
    showInputErrorMessage('name', false); //else turn error message off
  }
});

//when input has focus, turn error message off
nameInput.addEventListener('focus', () => {
  showInputErrorMessage('name', false);
});

//// EMAIL VALIDATION

//prevents form from submitting with email input left blank
requiredOn(emailInput);

//Custom messages for type of validation error
emailInput.dataset.valueMissing = ' Please provide your email address.';
emailInput.dataset.patternMismatch = ' Email must be properly formatted';

//code courtesy of rnevius from Stack Overflow, https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
//tests email (parameter) against pattern, returns true or false
const validateEmailPattern = email => { 
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //regular expression, pattern for email validation
  return re.test(String(email).toLowerCase()); //converts "email" to string & lowerCase, test email against re (regular expression) pattern; returns a Boolean
}

//both these listeners are used to update the emailHasFocus variable
emailInput.addEventListener('focus', () => {
  emailHasFocus = true; //sets variable to true during focus event
});
emailInput.addEventListener('blur', () => {
  emailHasFocus = false; //sets variable to false during blur event
});

//primary email validation function
const validateEmail = () => {
  if (!emailInput.checkValidity() || !validateEmailPattern(emailInput.value)) { //if test returns false; required test and pattern test
    if (emailInput.value === "" && emailHasFocus === true) { //checks if email has focus and is blank
      showInputErrorMessage('mail', false); //if so, then remove error message
    } else if (emailInput.validity.valueMissing) { //else if valueMissing is true
      showInputErrorMessage('mail', true, emailInput.dataset.valueMissing); //show valueMissing error message
    } else if (!validateEmailPattern(emailInput.value)) { //if email fails pattern test
      showInputErrorMessage('mail', true, emailInput.dataset.patternMismatch); //show patternMismatch error message
    }
  } else {
    showInputErrorMessage('mail', false); //if no error are found, remove error message
  }
}

//if focus leaves email input, then call email validation function 
emailInput.addEventListener('blur', () => {
  validateEmail();
});

//while user types, change border style to indicate validity
emailInput.addEventListener('keyup', () => { 
  validateEmail();
});

//when input has focus, check validation (this is an extra measure and helps insures the validation messages fire whether the user used a click or key to focus on the input. Prior to this, if the user clicked into the input the validation check didn't run until the user started to type)
emailInput.addEventListener('focus', () => {
  validateEmail();
});

///////////// REGISTER FOR ACTIVITIES VALIDATION /////////////

//shows error message in activities legend element
const showLegendErrorMessage = (tOrF, message) => {
  const currentElement = activitiesLegendElement; 
  const errorSpan = document.createElement('span');
  if (tOrF && currentElement.children.length === 0) { //if true and no span elements (error messages) are present
    currentElement.appendChild(errorSpan); //appends span (to hold error message)
    errorSpan.innerHTML = message; 
  } else if (!tOrF && currentElement.children.length >= 1) { //if true and error message is already present
    currentElement.children[0].remove(); //remove error message (to prevent duplicates)
  }
  errorHighlightText(activitiesLegendElement, tOrF); //styles legend element appropriately
}

//primary activities validation function
const validateActivities = () => {
  if (checkedActivities === 0) { //checkedActivities stores the total number of activities checked
    showLegendErrorMessage(true, ' – At least one activity must be selected');
  } else {
    showLegendErrorMessage(false, '');
  }
}

//// CREDIT CARD VALIDATION

//Custom messages for type of validation error
CCNumInput.dataset.valueMissing = ' Required';
CCZipInput.dataset.valueMissing = ' Required';
CCCVVInput.dataset.valueMissing = ' Required';
CCNumInput.dataset.patternMismatch = ' Must be 13-16 digits';
CCZipInput.dataset.patternMismatch = ' 5-digit #';
CCCVVInput.dataset.patternMismatch = ' 3-digit #';

//checks if CC is selected payment method, returns boolean
const ccPaymentSelected = () => {
  let value;
  //if selected payment method index is 1 (which is credit card), return true; otherwise false
  selectPaymentMethod.selectedIndex === 1 ? value = true : value = false; 
  return value;
}

//if credit card is selected, turn on CC validation; if not, turn it off
const requiredCC = () => {
  //toggles all CC input validations off
  const toggleCCOff = () => {
    requiredOff(CCNumInput);
    requiredOff(CCZipInput);
    requiredOff(CCCVVInput);
    patternOff(CCNumInput);
    patternOff(CCZipInput);
    patternOff(CCCVVInput);
  }
  //toggles all CC input requirements and patterns on, with regex for pattern
  const toggleCCOn = () => {
    requiredOn(CCNumInput);
    requiredOn(CCZipInput);
    requiredOn(CCCVVInput);
    patternOn(CCNumInput, '[0-9]{13,16}');
    patternOn(CCZipInput, '[0-9]{5}');
    patternOn(CCCVVInput, '[0-9]{3}');
  }
  //if cc is selected, turn cc validation on; if anything else other than cc is selected, turn cc validation off
  ccPaymentSelected() ? toggleCCOn() : toggleCCOff(); 
}

//function used for cc #, zip, and ccv validation
const validateInput = (input, stringName) => {
  if (!input.checkValidity()) { //if checkValidity returns false (then true for IF statement)
    if (input.validity.valueMissing) { //if value is missing
      showInputErrorMessage(stringName, true, input.dataset.valueMissing); //show valueMissing error
    } else if (input.validity.patternMismatch) { //if pattern doesn't match
      showInputErrorMessage(stringName, true, input.dataset.patternMismatch); //show patternMismatch error
    } else {
      showInputErrorMessage(stringName, false); //otherwise show no error
    }
  }
}

//if focus leaves CC input, then call CC validation function 
CCNumInput.addEventListener('blur', () => {
  validateInput(CCNumInput, 'cc-num');
});

//when input has focus, turn error message off
CCNumInput.addEventListener('focus', () => {
  showInputErrorMessage('cc-num', false);
});

//while user types, change border style to indicate validity
CCNumInput.addEventListener('keyup', () => {
  if (CCNumInput.validity.patternMismatch) {
    errorHighlightBorder(CCNumInput, true)
    } else {
    errorHighlightBorder(CCNumInput, false);
  }
});

//if focus leaves zip input, then call zip validation function 
CCZipInput.addEventListener('blur', () => {
  validateInput(CCZipInput, 'zip');
});

//when input has focus, turn error message off
CCZipInput.addEventListener('focus', () => {
  showInputErrorMessage('zip', false);
});

//while user types, change border style to indicate validity
CCZipInput.addEventListener('keyup', () => {
  if (CCZipInput.validity.patternMismatch) {
    errorHighlightBorder(CCZipInput, true)
    } else {
    errorHighlightBorder(CCZipInput, false);
  }
});

//if focus leaves ccv input, then call ccv validation function 
CCCVVInput.addEventListener('blur', () => {
  validateInput(CCCVVInput, 'cvv');
});

//when input has focus, turn error message off
CCCVVInput.addEventListener('focus', () => {
  showInputErrorMessage('cvv', false);
});

//while user types, change border style to indicate validity
CCCVVInput.addEventListener('keyup', () => {
  if (CCCVVInput.validity.patternMismatch) {
    errorHighlightBorder(CCCVVInput, true)
    } else {
    errorHighlightBorder(CCCVVInput, false);
  }
});

//// SUBMIT VALIDATION

// listens for submit button
formElement.addEventListener('submit', (e) => {
  //checks whole form for validity errors, if there is at least one error, runs block of code below; also check for at least one checked activity and valid email pattern
  if (!formElement.checkValidity() || checkedActivities === 0 || !validateEmailPattern(emailInput.value)) { 
    e.preventDefault(); //prevent form submission
    toggleMainError(true); //show error message
    window.scroll(0,0); //takes view back to top of page
    validateEmail(); //check email validation 
    validateActivities(); //check activities validation 
    validateInput(CCNumInput, 'cc-num'); //check all cc payment validation
    validateInput(CCZipInput, 'zip');
    validateInput(CCCVVInput, 'cvv');
  }
});

//listens to whole form, if main error message is present, removes it once form passes validation 
formElement.addEventListener('keyup', () => {
  //if whole form is valid and main error message is present
  if (formElement.checkValidity() && checkedActivities > 0 && validateEmailPattern(emailInput.value) && document.getElementById("main-error-message")) { 
    document.getElementById("main-error-message").remove(); //remove main error message
  }
});



/**********************************************************************
INITIAL CODE RUN ON PAGE LOAD
**********************************************************************/

nameInput.focus(); //sets focus to name input on page load
hide(colorDiv); //removes color div
activitiesField.appendChild(activitiesTotalH2); //appends total price h2 element
paymentOptions[0].style.display = 'none'; //hides the payment placeholder option
paymentOptions[1].selected = true; //selects credit card as default payment option
formElement.noValidate = true; //turns off default validation messages

removeOtherTitle(); //remove "other" input under job selection
removeHTMLColorOptions(colorMenu); //removes color menu
addColorPlaceholder(); //adds color placeholder
addNewHTMLColorMenu(); //adds color menu to HTML
toggleActivitiesTotal(); //removes activities price total
hideAllPaymentDivs(); //hides all payment divs
giveAllMatchingClass(); //gives matching classes to payment options and payment divs
show(creditCardDiv); //shows CC payment option by default
requiredCC(); //requires CC by default, since it is showing



/**********************************************************************
THANKS FOR VIEWING :)                                         ~Caleb
**********************************************************************/