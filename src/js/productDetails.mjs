import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // 1. Obtenemos los datos del producto usando el ID proporcionado
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Renderizamos los detalles en el HTML
    this.renderProductDetails();
    
    // 3. Añadimos el evento de clic al botón "Add to Cart"
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Guardamos el producto en el LocalStorage (usando una clave como 'so-cart')
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // Inyectamos cada propiedad del producto en su respectiva etiqueta HTML
    document.querySelector('#productName').innerText = this.product.Brand.Name;
    document.querySelector('#productNameWithoutBrand').innerText = this.product.NameWithoutBrand;
    document.querySelector('#productImage').src = this.product.Image;
    document.querySelector('#productImage').alt = this.product.Name;
    document.querySelector('#productFinalPrice').innerText = `$${this.product.FinalPrice}`;
    document.querySelector('#productColorName').innerText = this.product.Colors[0].ColorName;
    document.querySelector('#productDescriptionHtmlSimple').innerHTML = this.product.DescriptionHtmlSimple;
    
    // Asignamos el ID al botón para futuras referencias
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}