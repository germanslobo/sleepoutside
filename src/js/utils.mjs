// 1. Helper to grab a parameter from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// 2. Helper to save data into localStorage
export function setLocalStorage(key, data) {
  let existingData = JSON.parse(localStorage.getItem(key)) || [];
  
  if (Array.isArray(existingData)) {
    existingData.push(data);
    localStorage.setItem(key, JSON.stringify(existingData));
  } else {
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

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`No se pudo cargar el archivo en ${path} (Status: ${res.status} ${res.statusText})`);
  }
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  try {
    console.log("Iniciando carga de header y footer...");
    
    // Probamos cargando usando una ruta relativa desde src/js hacia public/partials
    const headerTemplate = await loadTemplate("../public/partials/header.html");
    const headerElement = document.querySelector("#main-header");
    
    const footerTemplate = await loadTemplate("../public/partials/footer.html");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
      console.log("Header renderizado correctamente.");
    } else {
      console.warn("No se encontró #main-header en el DOM.");
    }

    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
      console.log("Footer renderizado correctamente.");
    } else {
      console.warn("No se encontró #main-footer en el DOM.");
    }
    
  } catch (error) {
    console.error("Error al cargar el header o footer (probablemente ruta 404):", error);
  }
}