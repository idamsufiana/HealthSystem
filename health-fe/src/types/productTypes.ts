import { Category } from "./CategoryTypes";

export interface Product {
    id: number;
    name: string;
    sku: string;
    image: string;
    price: number;
    description?: string;
    category: Category;
  }