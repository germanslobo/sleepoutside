import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // 1. Obtener lo que ya existe en Local Storage o un arreglo vacío
  const cart = getLocalStorage("so-cart") || [];

  // 2. Si por algún motivo cart no fuera un arreglo (por datos viejos guardados), inicializar como []
  const cartList = Array.isArray(cart) ? cart : [cart];

  // 3. Agregar el nuevo producto al arreglo
  cartList.push(product);

  // 4. Guardar la lista actualizada de vuelta en Local Storage
  setLocalStorage("so-cart", cartList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
