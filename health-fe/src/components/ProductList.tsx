// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct, createProduct } from '../services/productService';
import ProductCard from './ProductCard';
import { Product } from '../types/productTypes';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const newProducts = await getProducts(page, 10);
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newProducts.length > 0);
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSave = async (product: Product) => {
    if (product.id) {
      // Update the existing product
      await updateProduct(product.id, product);
    } else {
      // Create a new product
      await createProduct(product);
    }
    setModalOpen(false);
    setSelectedProduct(null);
    setPage(1); // Reset pagination to the first page to refetch data
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}  // Pass the unique 'id' as the 'key'
            product={product}
            onEdit={() => handleEdit(product)} // Pass the handleEdit function
            onDelete={() => handleDelete(product.id)} // Pass the handleDelete function
          />
        ))}
      </div>

      {hasMore && (
        <div className="loading">
          {loading ? (
            'Loading...'
          ) : (
            <button onClick={loadMore} disabled={loading}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
