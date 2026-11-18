import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// Cambiamos ".order-summary" por ".checkout-summary" para que coincida con el HTML
const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const myForm = e.target;
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  
  if (chk_status) {
    myCheckout.checkout(myForm);
  }
});