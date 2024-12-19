import React from 'react';
import { Modal, Form, Input, InputNumber, Upload, Button } from 'antd';
import { useAddProduct, useEditProduct } from '../hooks/useProduct';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, product }) => {
  const [form] = Form.useForm();
  const { mutateAsync: addProduct } = useAddProduct();
  const { mutateAsync: editProduct } = useEditProduct();

  const handleSave = async (values: any) => {
    if (product) {
      await editProduct({ ...values, id: product.id });
    } else {
      await addProduct(values);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={product ? `Edit Product: ${product.name}` : 'Add New Product'}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSave} initialValues={product}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input product price' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="image" label="Image" valuePropName="fileList">
          <Upload action="/upload" listType="picture-card" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
