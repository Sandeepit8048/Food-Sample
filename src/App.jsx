import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:barcode" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;