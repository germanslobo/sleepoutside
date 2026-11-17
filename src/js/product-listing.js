import ExternalServices from './ExternalServices.mjs';
import ProductList from './productList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// 1. Carga dinámica del header y footer
loadHeaderFooter();

// 2. Obtenemos el parámetro 'category' de la URL (ej. ?category=tents)
const category = getParam('category');

// 3. Instanciamos los servicios y el contenedor de la lista
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');

// 4. Creamos la lista pasándole la categoría y renderizamos
const myList = new ProductList(category, dataSource, listElement);
myList.init();