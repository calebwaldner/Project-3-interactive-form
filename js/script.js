// Project notes:
// https://www.evernote.com/shard/s9/nl/1104480/c7e6320e-9745-4da8-8983-f7458355affa/



/**********************************************************************
GLOBAL VARIABLE DECLARATIONS
**********************************************************************/

//variable declarations
let jobOtherTitle;

//array for all shirt color options. color, value, and theme properties are required.
const shirtColorOptionsArr = [
  {color:'Cornflower Blue', value:'cornflowerblue', theme:'js puns'},
  {color:'Dark Slate Grey', value:'darkslategrey', theme:'js puns'},
  {color:'Gold', value:'gold', theme:'js puns'},
  {color:'Tomato', value:'tomato', theme:'heart js'},
  {color:'Steel Blue', value:'steelblue', theme:'heart js'},
  {color:'Dim Grey', value:'dimgrey', theme:'heart js'},
];

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

//create elements
const colorOptionPlaceholder = document.createElement('option');



/**********************************************************************
GENERAL FUNCTIONS
**********************************************************************/

//removes an item
const removeItem = (item) => {
  item.remove();
}



/**********************************************************************
FUNCTIONS RELATED TO JOB SELECTION
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
FUNCTIONS RELATED TO T-SHIRT SELECTION
**********************************************************************/

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
FUNCTIONS RELATED TO REGISTER FOR ACTIVITIES
**********************************************************************/


// const isChecked = e.target.checked;




/**********************************************************************
INITIAL CODE RUN ON PAGE LOAD
**********************************************************************/

//sets focus to name input on page load
document.getElementById('name').focus();

//removes color div
colorDiv.style.display = 'none';


removeOtherTitle();
removeHTMLColorOptions(colorMenu);
addColorPlaceholder();
addNewHTMLColorMenu();



/**********************************************************************
EVENT LISTENERS
**********************************************************************/

//listens for select box to change
jobSelect.addEventListener('change', () => {
  jobOtherFound() && removeOtherTitle(); //if jobOtherFound is true, removes jobOtherTitle box; if false, nothing
  jobValueCheck() && appendOtherJobInput(); //if jobValueCheck is true, appends "other" job text box; if false, nothing
});

shirtThemeMenu.addEventListener('change', () => {
  getColorOptions();
  toggleColorDiv();
});

activitiesField.addEventListener('change', (e) => {
  const checkbox = e.target;
  const isChecked = checkbox.checked;
  const lable = checkbox.parentNode;
});






/**********************************************************************
THANKS FOR VIEWING :)                                         ~Caleb
**********************************************************************/
