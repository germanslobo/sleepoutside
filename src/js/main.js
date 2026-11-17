import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from './ExternalServices.mjs';
import ProductList from './productList.mjs';

// 1. Cargamos el header y el footer dinámicamente
loadHeaderFooter();

// 2. Instanciamos ExternalServices en lugar de ProductData
const dataSource = new ExternalServices();

// 3. Seleccionamos el elemento HTML donde se mostrará la lista de productos
const element = document.querySelector('.product-list');

// 4. Instanciamos la clase que maneja la lista de productos pasándole la categoría, los datos y el contenedor HTML
const listing = new ProductList('Tents', dataSource, element);

// 5. Inicializamos el renderizado de los productos en la página principal
listing.init();