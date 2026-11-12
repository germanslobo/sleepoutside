import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './productData.mjs';
import ProductDetails from './productDetails.mjs';

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();