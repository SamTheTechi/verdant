import express, { Router } from 'express';
import { allProducts } from '../controller/products/allProducts';
import { productPage } from '../controller/products/product';

export const productRoute: Router = express.Router();

productRoute.get('/product', allProducts);
productRoute.get('/:productId', productPage);
