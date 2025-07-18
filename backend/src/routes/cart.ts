import express, { Router } from 'express';
import { addItem } from '../controller/cart/addItems';
import { clearItem } from '../controller/cart/clearItems';
import { clearCart } from '../controller/cart/clearCart';
import { getItem } from '../controller/cart/getItems';
import { AuthMiddleware } from '../middleware/authMiddleware';

export const cartRoute: Router = express.Router();

cartRoute.get('/item', AuthMiddleware, getItem);
cartRoute.post('/additem', AuthMiddleware, addItem);
cartRoute.patch('/clearitem', AuthMiddleware, clearItem);
cartRoute.delete('/clearcart', AuthMiddleware, clearCart);
