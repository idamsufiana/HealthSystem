import React, { useState } from 'react';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <ProductList />
    </div>
  );
};

export default App;