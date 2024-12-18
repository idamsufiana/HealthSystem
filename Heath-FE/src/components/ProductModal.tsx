import React, { useState, useEffect } from 'react';

interface ProductModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
  onSave: (product: any) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, product, onClose, onSave }) => {
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Edit Product</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <input type="text" name="price" value={formData.price} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductModal;
