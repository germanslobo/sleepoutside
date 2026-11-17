import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

// 1. Cargamos el header y footer dinámicamente
loadHeaderFooter();

// 2. Renderizamos el contenido del carrito
function renderCartContents() {
  let cartItems = getLocalStorage('so-cart') || [];
  
  // Aplanamos el array por si se guardó anidado (array dentro de array)
  cartItems = cartItems.flat();
  
  console.log("Cart items limpios:", cartItems);
  
  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    displayCartTotal(cartItems);
  } else {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.</p>';
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) cartFooter.classList.add('hide');
  }
}

function cartItemTemplate(item) {
  // Verificamos que item sea un objeto válido
  if (!item) return '';

  const imageUrl = item.Images?.PrimaryMedium || item.Images?.PrimarySmall || item.Images?.PrimaryLarge || '';
  const name = item.Name || 'Product';
  const price = item.FinalPrice !== undefined ? item.FinalPrice : (item.ListPrice || 0);
  const color = item.Colors && item.Colors[0] ? item.Colors[0].ColorName : '';

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageUrl}"
      alt="${name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${Number(price).toFixed(2)}</p>
</li>`;

  return newItem;
}

// 3. Calcula y muestra el total del carrito
function displayCartTotal(cartItems) {
  const cartFooterEl = document.querySelector('.cart-footer');
  const cartTotalEl = document.querySelector('#cart-total-value');
  
  let total = 0;
  cartItems.forEach((item) => {
    if (item) {
      const price = item.FinalPrice !== undefined ? item.FinalPrice : (item.ListPrice || 0);
      total += Number(price);
    }
  });
  
  if (cartTotalEl) cartTotalEl.innerText = total.toFixed(2);
  if (cartFooterEl) cartFooterEl.classList.remove('hide');
}

renderCartContents();