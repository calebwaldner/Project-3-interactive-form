// Project notes:
// https://www.evernote.com/shard/s9/nl/1104480/c7e6320e-9745-4da8-8983-f7458355affa/



/**********************************************************************
GLOBAL VARIABLE DECLARATIONS
**********************************************************************/

//variable declarations
let jobOtherTitle, activitiesInputs, activitiesInputsName, checkedArr, activityPrice=0, totalPrice=0, checkedActivities=0, selectedPayment, defultLabelText=[];

//get elements
const header = document.getElementsByTagName('header')[0];
const inputLabels = document.getElementsByTagName('label');
const inputElements = document.getElementsByTagName('input');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const formElement = document.getElementsByTagName('form')[0];
const basicInfoFieldSet = document.getElementById('basic-info');
const jobSelect = document.getElementById('title');
const jobOtherInput = document.getElementById('other-title');
const colorDiv = document.getElementById('colors-js-puns');
const colorMenu = document.getElementById('color');
const firstColorOption = colorMenu.firstElementChild;
const allColorOptions = colorMenu.children;
const shirtThemeMenu = document.getElementById('design');
const activitiesField = document.getElementsByClassName('activities')[0];
const activitiesLegendElement = activitiesField.getElementsByTagName('legend')[0];
const activitiesLabels = activitiesField.getElementsByTagName('label');
const selectPaymentMethod = document.getElementById('payment');
const paymentOptions = selectPaymentMethod.children; //array containing option elements; 1 = credit card, 2 = paypal, 3 = bitcoin
const paymentInfoFieldset = formElement.children[3];
const creditCardDiv = document.getElementById('credit-card');
const CCNumInput = document.getElementById('cc-num');
const CCZipInput = document.getElementById('zip');
const CCCVVInput = document.getElementById('cvv');
const payPalDiv = paymentInfoFieldset.children[4];
const bitcoinDiv = paymentInfoFieldset.children[5];
const submitButton = document.getElementsByTagName('button')[0];

//create elements
const colorOptionPlaceholder = document.createElement('option');
const activitiesTotalH2 = document.createElement('h2');



/**********************************************************************
GENERAL FUNCTIONS
**********************************************************************/

//removes an item
const removeItem = (item) => {
  item.remove();
}

//sets the element display style to none
const hide = (element) => {
  element.style.display = 'none';
}

//sets the element display style to block
const show = (element) => {
  element.style.display = 'block';
}

const requiredOn  = (element) => {
  element.required = true;
}

const requiredOff  = (element) => {
  element.removeAttribute('required');
}

const patternOn  = (element, patternString) => {
  element.pattern = patternString;
}

const patternOff  = (element) => {
  element.removeAttribute('pattern');
}



/**********************************************************************
RELATED TO JOB SELECTION
**********************************************************************/

//checks job select input, returns true if "other" is selected, false if not
const jobValueCheck = () => {
  let jobValue = jobSelect.value === 'other'; //if job selection is "other", store true; if not "other", store false
  return jobValue;
}

//finds "other-job" input box, returns true if it's found, false if not
const jobOtherFound = () => {
  let found = jobOtherTitle; //stores string or null
  let result = found !== null ? true : false; //if found is not null, return true; if null, return false
  return result;
}

//removes input element for "other" job option
const removeOtherTitle = () => {
  removeItem(document.getElementById('other-title'));
  jobOtherTitle = null;
}

//appends input box for user to type job
const appendOtherJobInput = () => {
  basicInfoFieldSet.appendChild(jobOtherInput);
  jobOtherTitle = jobOtherInput;
}



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

//removes color options from HTML - though it's more simple to set display to none, removing these elements cleans up the HTML. a new list will be appended
const removeHTMLColorOptions = (removeColors) => {
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
    hide(colorOption); //all options hidden by defalt
  }
}

//shows colors that match the shirt theme
const getColorOptions = () => {
  let selTheme = shirtThemeMenu.value; //gets theme selected
  let currentColorList = []; //empties array, staged to be stored with filtered colors
  for (let i=0; i<colorMenu.length; i++) { //loops through each color to match with theme
    if (colorMenu[i].theme === selTheme) { //if tshirt color theme matches selected theme
      show(colorMenu[i]); //then set display style to block (show it)
      currentColorList.push(colorMenu[i]); //and push color to currentColorList array
    } else {
      hide(colorMenu[i]) //otherwise, set display style to none (hide it)
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
const setSelected = (list) => {
  if (list.length > 0) { //if there are any color options currently displayed
    list[0].selected = true; //then select the first one
  } else { //placeholder is selected and visible
    show(colorOptionPlaceholder);
    colorOptionPlaceholder.selected = true;
  }
}



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
const greyOut = (activityName) => {
  for (let i=0; i<activitiesLabels.length; i++) {
    if (activityName === activitiesLabels[i].firstElementChild.name) { //takes the name and finds the label element
      activitiesLabels[i].style.color = '#888'; //turns input label grey
      activitiesLabels[i].firstElementChild.setAttribute('disabled', ''); //disables insput element
    }
  }
}

//accepts an input to change from greyOut to defult
const cancelGreyOut = (activityName) => {
  for (let i=0; i<activitiesLabels.length; i++) {
    if (activityName === activitiesLabels[i].firstElementChild.name) { //takes the name and finds the label element
      activitiesLabels[i].style.color = '#000'; //turns input label black
      activitiesLabels[i].firstElementChild.removeAttribute('disabled', ''); //disables insput element
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

//checks for conflicting activities and greys them out or restors defult, depending on if checked or unchecked
const getConflictingElements = (checkedActivity, arr, checkedOrNot) => {
  for (let i=0; i<arr.length; i++) {
    //if checked, then find confilicting activities and grey them out, if not checked (just unchecked), then find confilicting element (currently greyed out) and restore defults
    checkedOrNot ? checkForConflict(checkedActivity, arr[i]) && greyOut(arr[i].name) : checkForConflict(checkedActivity, arr[i]) && cancelGreyOut(arr[i].name);
  }
}

//shows activities price total if the total is more than $0
const toggleActivitiesTotal = () => {
  totalPrice <= 0 ? hide(activitiesTotalH2) : show(activitiesTotalH2);
}

//gets to price of the activity, stores in global variable
const getActivityPrice = (activity) => {
  activityPrice = activity.price;
  return activityPrice;
}

//if the activity was just checked (true), add activity price to total price (global variable), if unchecked, subtract activity price from total price
const updateActivityPrice = (checked) => {
  checked ? totalPrice += activityPrice : totalPrice -= activityPrice;
  activitiesTotalH2.innerHTML = 'Total: $' + totalPrice;
}

//counts number of checked activities
const getNumberChecked = (checked) => {
  //if true, plus one checked activity; if false, minus one
  checked ? checkedActivities += 1 : checkedActivities -= 1;
}



/**********************************************************************
RELATED TO PAYMENT INFO
**********************************************************************/

//hides all payment divs
const hideAllPaymentDivs = () => {
  hide(creditCardDiv);
  hide(payPalDiv);
  hide(bitcoinDiv);
}

//hides previous payment divs and shows new div
const togglePaymentDiv = (div) => {
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



/**********************************************************************
FORM VALIDATION
**********************************************************************/

/*
Alot of credit given to Ana Sampaio who wrote an artical for The UI Files. This article was a major resource used in creating this form validation.
https://medium.com/the-ui-files/form-validation-with-javascript-4fcf4dd32846
*/


//array of error messages, used for unique input validation
const labelErrorMessages = [
  {label:'name', errorMessage: 'Please include your full name.'}, 
  {label:'mail', errorMessage: 'Please include a valid email'}, 
  {label:'title', errorMessage: '– Please provide a job title'}, 
  {label:'design', errorMessage: 'Please select a t-shirt design'}, 
  {label:'activity', errorMessage: 'Please select an activity'}, 
  {label:'cc-num', errorMessage: 'Must be a valid CC number'}, 
  {label:'zip', errorMessage: ''}, 
  {label:'cvv', errorMessage: ''}, 
];

//appends and styles main error message at the top of the page, toggle based off true or false parameter
const toggleMainError = tOrF => {
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

//taks string as parameter and returns input element with matching id
const getInputElement = labelFor => {
  let input;
  for (let i=0; i<inputElements.length; i++) {
    inputElements[i].id === labelFor ? input = inputElements[i] :'';
  }
  return input;
}

//gets error message from array based off parameter, takes a string, must match label property from arrey
const getErrorMessage = forLabel => {
  let currentMessage;
  for (i=0; i<labelErrorMessages.length; i++) {
    if (labelErrorMessages[i].label === forLabel) {
      currentMessage = labelErrorMessages[i].errorMessage;
    }
  }
  return currentMessage;
}

const showInputErrorMessage = (labelName, tOrF, message) => {
  const currentLebelElement = getLabelElement(labelName);
  const currentInputElement = getInputElement(labelName);
  const errorSpan = document.createElement('span');
  if (tOrF && currentLebelElement.children.length === 0) {
    currentLebelElement.appendChild(errorSpan);
    errorSpan.innerHTML = message;
  } else if (!tOrF && currentLebelElement.children.length >= 1){
    currentLebelElement.children[0].remove();
  }
  errorHighlightText(currentLebelElement, tOrF);
  errorHighlightBorder(currentInputElement, tOrF);
}


///////////// NAME VALIDATION /////////////

//prevents form from submitting with name input left blank
requiredOn(nameInput);

//Custom message for type of validation error
nameInput.dataset.valueMissing = ' Please include your full name.';

//if focus leaves name input while it is blank, then show invalid formatting
nameInput.addEventListener('blur', () => {
  if (!nameInput.checkValidity()) {
    showInputErrorMessage('name', true, nameInput.dataset.valueMissing);
  } else {
    showInputErrorMessage('name', false);
  }
});

nameInput.addEventListener('focus', () => {
  showInputErrorMessage('name', false);
});

///////////// EMAIL VALIDATION /////////////

requiredOn(emailInput);

emailInput.dataset.valueMissing = ' Please provide your email address.';
emailInput.dataset.patternMismatch = ' Email must be properly formatted';

//code courtesy of rnevius from Stack Overflow, https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmailPattern = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateEmail = () => {
  if (!emailInput.checkValidity() || !validateEmailPattern(emailInput.value)) {
    if (emailInput.validity.valueMissing) {
      showInputErrorMessage('mail', true, emailInput.dataset.valueMissing);
    } else if (validateEmailPattern(emailInput.value) === false) {
      showInputErrorMessage('mail', true, emailInput.dataset.patternMismatch);
    }
  } else {
    showInputErrorMessage('mail', false);
  }
}

emailInput.addEventListener('blur', () => {
  validateEmail();
});

emailInput.addEventListener('keyup', () => {
  if (!validateEmailPattern(emailInput.value)) {
    errorHighlightBorder(emailInput, true)
    } else {
    errorHighlightBorder(emailInput, false);
  }
});

emailInput.addEventListener('focus', () => {
  showInputErrorMessage('mail', false);
});

///////////// REGISTER FOR ACTIVITIES VALIDATION /////////////

//prevents form from submitting if no activity is selected

const showLegendErrorMessage = (tOrF, message) => {
  const currentElement = activitiesLegendElement;
  const errorSpan = document.createElement('span');
  if (tOrF && currentElement.children.length === 0) {
    currentElement.appendChild(errorSpan);
    errorSpan.innerHTML = message;
    currentElement.parentElement.validity.valid = false;
  } else if (!tOrF && currentElement.children.length >= 1){
    currentElement.children[0].remove();
  }
  errorHighlightText(activitiesLegendElement, tOrF);
}

const validateActivities = () => {
  if (checkedActivities === 0) { //checkedActivities stores the total number of activities checked
    showLegendErrorMessage(true, ' – At least one activity must be selected');
  } else {
    showLegendErrorMessage(false, '');
  }
}


///////////// CREDIT CARD VALIDATION /////////////

CCNumInput.dataset.valueMissing = ' Required';
CCZipInput.dataset.valueMissing = ' Required';
CCCVVInput.dataset.valueMissing = ' Required';
CCNumInput.dataset.patternMismatch = ' Must be 13-16 digits';
CCZipInput.dataset.patternMismatch = ' To short';
CCCVVInput.dataset.patternMismatch = ' 3 digits only';

const paymentSelected = () => {
  let value;
  selectPaymentMethod.selectedIndex === 1 ? value = true : value = false;
  return value;
}

//if credit card is selected, turn on CC validation; if not, turn it off
const requiredCC = () => {
  //toggles all CC inputs validations off
  const toggleCCOff = () => {
    requiredOff(CCNumInput);
    requiredOff(CCZipInput);
    requiredOff(CCCVVInput);
    patternOff(CCNumInput);
    patternOff(CCZipInput);
    patternOff(CCCVVInput);
  }
  //toggles all CC inputs requierments and patterns on, with regex for pattern
  const toggleCCOn = () => {
    requiredOn(CCNumInput);
    requiredOn(CCZipInput);
    requiredOn(CCCVVInput);
    patternOn(CCNumInput, '[0-9]{13,16}');
    patternOn(CCZipInput, '[0-9]{5,}');
    patternOn(CCCVVInput, '[0-9]{3}');
  }
  paymentSelected() ? toggleCCOn() : toggleCCOff();
}

const validateInput = (input, stringName) => {
  if (!input.checkValidity()) {
    if (input.validity.valueMissing) {
      showInputErrorMessage(stringName, true, input.dataset.valueMissing);
    } else if (input.validity.patternMismatch) {
      showInputErrorMessage(stringName, true, input.dataset.patternMismatch);
    } else {
      showInputErrorMessage(stringName, false);
    }
  }
}

CCNumInput.addEventListener('blur', () => {
  validateInput(CCNumInput, 'cc-num');
});

CCNumInput.addEventListener('focus', () => {
  showInputErrorMessage('cc-num', false);
});

CCNumInput.addEventListener('keyup', () => {
  if (CCNumInput.validity.patternMismatch) {
    errorHighlightBorder(CCNumInput, true)
    } else {
    errorHighlightBorder(CCNumInput, false);
  }
});

CCZipInput.addEventListener('blur', () => {
  validateInput(CCZipInput, 'zip');
});

CCZipInput.addEventListener('focus', () => {
  showInputErrorMessage('zip', false);
});

CCZipInput.addEventListener('keyup', () => {
  if (CCZipInput.validity.patternMismatch) {
    errorHighlightBorder(CCZipInput, true)
    } else {
    errorHighlightBorder(CCZipInput, false);
  }
});

CCCVVInput.addEventListener('blur', () => {
  validateInput(CCCVVInput, 'cvv');
});

CCCVVInput.addEventListener('focus', () => {
  showInputErrorMessage('cvv', false);
});

CCCVVInput.addEventListener('keyup', () => {
  if (CCCVVInput.validity.patternMismatch) {
    errorHighlightBorder(CCCVVInput, true)
    } else {
    errorHighlightBorder(CCCVVInput, false);
  }
});


///////////// SUBMIT VALIDATION /////////////

// listens for submit button
formElement.addEventListener('submit', (e) => {
  if (!formElement.checkValidity() || checkedActivities === 0) { //checks whole form for validity errors, if there is at least one error, runs block of code below
    console.log('there was an error');
    e.preventDefault();
    toggleMainError(true);
    window.scroll(0,0);
    validateEmail();
    validateActivities();
    validateInput(CCNumInput, 'cc-num');
    validateInput(CCZipInput, 'zip');
    validateInput(CCCVVInput, 'cvv');
  }
});



/**********************************************************************
INITIAL CODE RUN ON PAGE LOAD
**********************************************************************/

nameInput.focus(); //sets focus to name input on page load
hide(colorDiv); //removes color div
activitiesField.appendChild(activitiesTotalH2); //appends total price h2 element
paymentOptions[0].style.display = 'none'; //hides the payment placeholder option
paymentOptions[1].selected = true; //selects credit card as defult payment option
formElement.noValidate = true; //turns off defult validation messages

removeOtherTitle();
removeHTMLColorOptions(colorMenu);
addColorPlaceholder();
addNewHTMLColorMenu();
toggleActivitiesTotal();
hideAllPaymentDivs();
giveAllMatchingClass();
show(creditCardDiv); //shows CC payment option by defult
requiredCC(); //requires CC by defult, since it is showing



/**********************************************************************
EVENT LISTENERS
**********************************************************************/

//listens for job select box to change
jobSelect.addEventListener('change', () => {
  jobOtherFound() && removeOtherTitle(); //if jobOtherFound is true, removes jobOtherTitle box; if false, nothing
  jobValueCheck() && appendOtherJobInput(); //if jobValueCheck is true, appends "other" job text box; if false, nothing
});

//listens for tshirt design select box to change
shirtThemeMenu.addEventListener('change', () => {
  getColorOptions();
  toggleColorDiv();
});

//listens for actifities to be checked
activitiesField.addEventListener('change', (e) => {
const checkedActivity = e.target; //stores checked input
const isChecked = checkedActivity.checked; //true or false
const checkedActivityName = checkedActivity.name; //stores checkedActivity (input element) name property
matchChecked(checkedActivityName, activitiesArr); //matches checked activity with corresponding array element (each activity in the HTML has a matching array element in activitiesArr)
getConflictingElements(checkedActivity, activitiesArr, isChecked); //gets conflicting activities (if any) and greys out or cancels grey out appropriately (if checked or unchecked)
getActivityPrice(checkedArr); //get price of activity
updateActivityPrice(isChecked); //add or subtract the activity price from total price
toggleActivitiesTotal(); //show total if it is greater than $0
getNumberChecked(isChecked); //counts number of checked inputs
validateActivities(); //checks validation after changes have been made to activities selection
});

//listens for payment method selection
selectPaymentMethod.addEventListener('change', () => {
  showSelectedPayment();
  requiredCC(); //on or off, depending on if CC is selected payment method
});




/**********************************************************************
THANKS FOR VIEWING :)                                         ~Caleb
**********************************************************************/