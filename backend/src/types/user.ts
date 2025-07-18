import { Iproducts } from './product';

export interface IloginUser {
  email: string;
  password: string;
}

export interface IsignupUser extends IloginUser {
  name: string;
  cheakout: Iproducts[];
}
