import { useState } from 'react';
import { useInfiniteQuery, useQuery, useMutation } from 'react-query';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { Product } from '../types/productTypes';

export const useProduct = (page: number) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<Product[], unknown>(
    'products',  // Query key
    ({ pageParam = 1 }) => getProducts(page, 10),  
    {
      getNextPageParam: (lastPage) => lastPage.length === 10 ? lastPage.length + 1 : false, 
    }
  );
  return { data, isLoading, isError, fetchNextPage, hasNextPage };
};

export const useAddProduct = () => {
  return useMutation(createProduct);
};


export const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};


export const useEditProduct = () => {
  return useMutation(
    ({ id, product }: { id: number; product: Product }) => updateProduct(id, product)
  );
};

