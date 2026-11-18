import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Función auxiliar para empaquetar los ítems del carrito en el formato que espera la API
function packageItems(items) {
  return items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice !== undefined ? item.FinalPrice : (item.ListPrice || 0),
      quantity: 1
    };
  });
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.list = this.list.flat();
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemNumElement = document.querySelector(`${this.outputSelector} #num-items`);
    
    let subtotal = 0;
    let count = 0;
    
    this.list.forEach((item) => {
      if (item) {
        const price = item.FinalPrice !== undefined ? item.FinalPrice : (item.ListPrice || 0);
        subtotal += Number(price);
        count += 1;
      }
    });

    this.itemTotal = subtotal;

    if (itemNumElement) itemNumElement.innerText = count;
    if (summaryElement) summaryElement.innerText = `$${subtotal.toFixed(2)}`;

    this.calculateOrdertotal();
  }

  calculateOrdertotal() {
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const totalEl = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

  async checkout(form) {
    const formJSON = this.formDataToJSON(form);
    
    formJSON.orderDate = new Date().toISOString();
    formJSON.orderTotal = Number(this.orderTotal.toFixed(2));
    formJSON.tax = Number(this.tax.toFixed(2));
    formJSON.shipping = Number(this.shipping.toFixed(2));
    formJSON.items = packageItems(this.list);

    console.log("JSON enviado al servidor:", JSON.stringify(formJSON, null, 2));

    try {
      const res = await services.checkout(formJSON);
      console.log("Orden enviada con éxito:", res);
      
      setLocalStorage(this.key, []);
      window.location.assign("/checkout/success.html");
    } catch (err) {
      console.error("Error al procesar la orden:", err);
      
      // Manejo profesional del error con alertMessage
      const errorMessage = err.message;
      if (typeof errorMessage === 'object' && errorMessage !== null) {
        Object.values(errorMessage).forEach((msg) => {
          alertMessage(msg);
        });
      } else {
        alertMessage(errorMessage || "Error al enviar la orden.");
      }
    }
  }
}