import express, { Router } from 'express';
import { getProducts } from '../controller/products/getAllProducts';
import { productPage } from '../controller/products/product';

export const productRoute: Router = express.Router();

productRoute.get('/getproduct', getProducts);
productRoute.get('/:productId', productPage);
