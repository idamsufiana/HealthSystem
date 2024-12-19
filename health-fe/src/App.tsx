// App.tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add Product
      </Button>
      <ProductList />
      <ProductModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default App;
