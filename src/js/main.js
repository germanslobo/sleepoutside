import ProductData from './productData.mjs';
import ProductList from './productList.mjs';

// 1. Instanciamos la clase que obtiene los datos de las tiendas de campaña (categoría 'tents')
const dataSource = new ProductData('tents');

// 2. Seleccionamos el elemento HTML donde se mostrará la lista de productos
const element = document.querySelector('.product-list');

// 3. Instanciamos la clase que maneja la lista de productos pasándole la categoría, los datos y el contenedor HTML
const listing = new ProductList('Tents', dataSource, element);

// 4. Inicializamos el renderizado de los productos en la página principal
listing.init();
