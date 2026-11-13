import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // 1. Obtenemos los detalles del producto directamente desde la API usando el ID
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Renderizamos los detalles en la página
    this.renderProductDetails();
    
    // 3. Agregamos el evento al botón de "Añadir al carrito"
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    document.querySelector('#productName').innerText = this.product.Brand.Name;
    document.querySelector('#productNameWithoutBrand').innerText = this.product.Name;
    
    // Usamos PrimaryLarge según la nueva estructura de la API para los detalles
    document.querySelector('#productImage').src = this.product.Images.PrimaryLarge;
    document.querySelector('#productImage').alt = this.product.Name;
    
    document.querySelector('#productFinalPrice').innerText = `$${this.product.FinalPrice}`;
    document.querySelector('#productColorName').innerText = this.product.Colors[0].ColorName;
    document.querySelector('#productDescriptionHtmlSimple').innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector('#addToCart').setAttribute('data-id', this.product.Id);
  }
}