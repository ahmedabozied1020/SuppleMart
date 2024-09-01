export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rate: number;
  count: number;
  salesCount: number;
  categories: string[];
}
