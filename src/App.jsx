
import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Product App</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
