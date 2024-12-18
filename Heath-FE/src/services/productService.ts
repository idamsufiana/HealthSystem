import apiClient from '../components/apiClient'; // Import the custom axios instance
import { Product } from '../types/productTypes';

const API_URL = '/products'; // Use relative URL for the API endpoint

// Get list of products with pagination
export const getProducts = async (page: number, limit: number): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data; // TypeScript knows that response.data is of type Product[]
};

// Create a new product
export const createProduct = async (product: Product): Promise<Product> => {
  const response = await apiClient.post<Product>(API_URL, product);
  return response.data;
};

// Update an existing product
export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await apiClient.put<Product>(`${API_URL}/${id}`, product);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`${API_URL}/${id}`);
};
