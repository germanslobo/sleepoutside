import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// ... el resto del código de productos ...



import ExternalServices from './productData.mjs';
import ProductDetails from './productDetails.mjs';
import { getParam } from './utils.mjs';

// 1. Obtenemos el ID del producto desde la URL (ej: ?product=880RR)
const productId = getParam('product');

// 2. Instanciamos el servicio de datos para la categoría 'tents'
const dataSource = new ExternalServices('tents');

// 3. Creamos la instancia de ProductDetails pasándole el ID y los datos
const product = new ProductDetails(productId, dataSource);

// 4. Inicializamos la carga y renderizado
product.init();
