import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Cargamos el header y footer dinámicamente
loadHeaderFooter();

// Inicializamos el proceso de checkout usando la llave del carrito 'so-cart' y el selector del contenedor
const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
myCheckout.init();

// Escuchamos el evento 'change' en el código postal (Zip Code) para recalcular los impuestos y envío si fuera necesario
document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// Escuchamos el evento submit del formulario para procesar la orden
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Llamamos al método checkout pasando el formulario actual
  myCheckout.checkout(e.target);
});