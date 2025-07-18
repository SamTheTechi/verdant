import express, { Router } from 'express';
import { Userlogin } from '../controller/auth/login';
import { UserSignup } from '../controller/auth/signup';
import { UserRemove } from '../controller/auth/delete';
import { Userlogout } from '../controller/auth/logout';
import { RefreshToken } from '../controller/auth/refersh';
import { IsUserLogin } from '../controller/auth/islogin';

import { AuthMiddleware } from '../middleware/authMiddleware';

export const authRoute: Router = express.Router();

authRoute.get('/islogin', IsUserLogin);
authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
authRoute.post('/deleteAccount', AuthMiddleware, UserRemove);
authRoute.get(`/logout`, Userlogout);
authRoute.post('/refreshtoken', Userlogin);
