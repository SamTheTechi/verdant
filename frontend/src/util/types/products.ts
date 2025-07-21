export interface IproductsCard {
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface IproductsData extends IproductsCard {
  _id: string;
  description: string;
  features: string[];
}
