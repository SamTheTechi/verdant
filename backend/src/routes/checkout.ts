import express, { Router } from "express";
import { varify } from "../controller/cheakout/varify";
import { buyone } from "../controller/cheakout/buyone";
import { cheakout } from "../controller/cheakout/checkout";

import { AuthMiddleware } from "../middleware/authMiddleware";

export const checkoutRoute: Router = express.Router();

checkoutRoute.post('/buyone', AuthMiddleware, buyone);
checkoutRoute.get('/checkout', AuthMiddleware, cheakout);
checkoutRoute.post('/varify', AuthMiddleware, varify);



