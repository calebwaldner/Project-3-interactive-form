// Project notes:
// https://www.evernote.com/shard/s9/nl/1104480/c7e6320e-9745-4da8-8983-f7458355affa/



/**********************************************************************
GLOBAL VARIABLE DECLARATIONS
**********************************************************************/

//variable declarations
let jobOtherTitle, activitiesInputs, activitiesInputsName, checkedArr, activityPrice=0, totalPrice=0;

//get elements
const basicInfoFieldSet = document.getElementById('basic-info');
const jobSelect = document.getElementById('title');
const jobOtherInput = document.getElementById('other-title');
const colorDiv = document.getElementById('colors-js-puns');
const colorMenu = document.getElementById('color');
const firstColorOption = colorMenu.firstElementChild;
const allColorOptions = colorMenu.children;
const shirtThemeMenu = document.getElementById('design');
const activitiesField = document.getElementsByClassName('activities')[0];
const activitiesLabels = activitiesField.getElementsByTagName('label');

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
    colorOption.style.display = 'none'; //all options hidden by defalt
  }
}

//shows colors that match the shirt theme
const getColorOptions = () => {
  let selTheme = shirtThemeMenu.value; //gets theme selected
  let currentColorList = []; //empties array, staged to be stored with filtered colors
  for (let i=0; i<colorMenu.length; i++) { //loops through each color to match with theme
    if (colorMenu[i].theme === selTheme) { //if tshirt color theme matches selected theme
      colorMenu[i].style.display = 'block'; //then set display style to block (show it)
      currentColorList.push(colorMenu[i]); //and push color to currentColorList array
    } else {
      colorMenu[i].style.display = 'none'; //otherwise, set display style to none (hide it)
    }
  }
  setSelected(currentColorList); //sets first option as selected
}

//toggles color div if shirt theme is selected
const toggleColorDiv = () => {
  if (colorMenu.value === '← Please select a design') { //if colorMenu is the placeholder
    colorDiv.style.display = 'none'; // then hide the color div
  } else {
    colorDiv.style.display = 'block'; //otherwise show the color div
  }
}

//sets first option as selected or placeholder option as visible and selected
const setSelected = (list) => {
  if (list.length > 0) { //if there are any color options currently displayed
    list[0].selected = true; //then select the first one
  } else { //placeholder is selected and visible
    colorOptionPlaceholder.style.display = 'block';
    colorOptionPlaceholder.selected = true;
  }
}



/**********************************************************************
RELATED TO REGISTER FOR ACTIVITIES
**********************************************************************/

//array holding info from activities section, uses name property to match with actvitiesLables.
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
  totalPrice <= 0 ? activitiesTotalH2.style.display = 'none' : activitiesTotalH2.style.display = 'block';
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



/**********************************************************************
INITIAL CODE RUN ON PAGE LOAD
**********************************************************************/

//sets focus to name input on page load
document.getElementById('name').focus();

//removes color div
colorDiv.style.display = 'none';

//appends total price h2 element
activitiesField.appendChild(activitiesTotalH2);

removeOtherTitle();
removeHTMLColorOptions(colorMenu);
addColorPlaceholder();
addNewHTMLColorMenu();
toggleActivitiesTotal();


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

activitiesField.addEventListener('change', (e) => {
const checkedActivity = e.target; //stores checked input
const isChecked = checkedActivity.checked; //true or false
const checkedActivityName = checkedActivity.name; //stores checkedActivity (input element) name property
matchChecked(checkedActivityName, activitiesArr); //matches checked activity with corresponding array element (each activity in the HTML has a matching array element in activitiesArr)
getConflictingElements(checkedActivity, activitiesArr, isChecked); //gets conflicting activities (if any) and greys out or cancels grey out appropriately (if checked or unchecked)
getActivityPrice(checkedArr); //get price of activity
updateActivityPrice(isChecked); //add or subtract the activity price from total price
toggleActivitiesTotal(); //show total if it is greater than $0
});



/**********************************************************************
THANKS FOR VIEWING :)                                         ~Caleb
**********************************************************************/
