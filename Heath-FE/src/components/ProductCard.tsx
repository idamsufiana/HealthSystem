import React from 'react';
import { Product } from '../types/productTypes';

interface ProductCardProps {
  product: Product;       // Expecting a Product object
  onEdit: () => void;     // Callback function for editing the product
  onDelete: () => Promise<void>; // Callback function for deleting the product
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ProductCard;
