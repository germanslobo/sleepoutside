// 1. Helper to grab a parameter from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// 2. Helper to save data into localStorage
export function setLocalStorage(key, data) {
  // To handle multiple items or single items cleanly in the cart:
  // Let's check if there is already an existing array in local storage, or start a new one.
  let existingData = JSON.parse(localStorage.getItem(key)) || [];
  
  if (Array.isArray(existingData)) {
    existingData.push(data);
    localStorage.setItem(key, JSON.stringify(existingData));
  } else {
    // Fallback if storing a single object/array directly
    localStorage.setItem(key, JSON.stringify(data));
  }
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Helper to get data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}