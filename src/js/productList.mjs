// src/js/ProductList.mjs
import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // 1. Fetch the product list from the data source
    const list = await this.dataSource.getData();
    
    // 2. Render the products into the HTML list element
    this.renderList(list);
  }

  renderList(list) {
    // Usamos la función genérica reutilizable de utils.mjs
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}