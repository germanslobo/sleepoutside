import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // 1. Obtenemos los productos filtrados por la categoría desde la API
    const list = await this.dataSource.getData(this.category);
    
    // 2. Renderizamos la lista en pantalla
    this.renderList(list);
    
    // 3. Actualizamos el título de la página según la categoría seleccionada
    const titleElement = document.querySelector('.products h2');
    if (titleElement && this.category) {
      const formattedCategory = this.category.charAt(0).toUpperCase() + this.category.slice(1);
      titleElement.innerHTML = `Top Products: ${formattedCategory}`;
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <!-- Usamos PrimaryMedium según la nueva estructura de la API -->
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}