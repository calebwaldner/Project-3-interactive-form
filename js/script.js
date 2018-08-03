// Project notes:
// https://www.evernote.com/shard/s9/nl/1104480/c7e6320e-9745-4da8-8983-f7458355affa/

/*================================================================================
================================================================================*/

//gets elements
const basicInfoFieldSet = document.getElementById('basic-info');
const jobSelect = document.getElementById('title');

//creates elements
const jobOtherInput = document.createElement('input');


//sets focus to name input on page load
document.getElementById('name').focus();

//appends input box for user to type job
const appendOtherJobInput = () => {
  jobOtherInput.type = 'text';
  jobOtherInput.placeholder = 'Your job role';
  jobOtherInput.id = 'other-job';
  basicInfoFieldSet.appendChild(jobOtherInput);
}

//removes an item
const removeItem = (item) => {
  item.remove();
}

//checks job select input, returns true if "other" is selected, false if not
const jobValueCheck = () => {
  let jobValue = jobSelect.value === 'other'; //if job selection is "other", store true; if not "other", store false
  return jobValue;
}

//finds "other-job" input box, returns true if it's found, false if not
const jobOtherFound = () => {
  let found = document.getElementById('other-job'); //stores string or null
  let result = found !== null ? true : false; //if found is not null, return true; if null, return false
  return result;
}


jobSelect.addEventListener('change', (event) => {
  jobOtherFound() && removeItem(document.getElementById('other-job'));
  jobValueCheck() && appendOtherJobInput();
});


// if (jobSelect.value === 'other') {
//   console.log('true');
// } else {
//   console.log('false');
// }
