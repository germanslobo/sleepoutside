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

// Función para mostrar alertas personalizadas no intrusivas
export function alertMessage(message, scroll = true) {
  // Crear un elemento div para la alerta
  const alert = document.createElement('div');
  alert.classList.add('alert');
  
  // Agregar el contenido con el mensaje y una "X" para cerrar
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  
  // Escuchar clics en la alerta para detectar si se hizo clic en la "X"
  alert.addEventListener('click', function(e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });
  
  // Insertar la alerta al inicio del elemento main
  const main = document.querySelector('main');
  main.prepend(alert);
  
  // Desplazar la ventana hacia arriba si scroll es true
  if (scroll) {
    window.scrollTo(0, 0);
  }
}