
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      let comparison = 0;
      if (a[sortBy] > b[sortBy]) {
        comparison = 1;
      } else if (a[sortBy] < b[sortBy]) {
        comparison = -1;
      }
      return sortDirection === 'asc' ? comparison : comparison * -1;
    });

    return sortedProducts;
  };

  const getSortedProducts = () => {
    if (sortBy) {
      return sortProducts();
    } else {
      return products;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="product-list-container">
      <div className="product-column">
        <button className="sort-button" onClick={() => handleSort('title')}>
          Sort by Title
        </button>
        <h2>Title</h2>
        <ul>
          {sortedProducts.map((product, index) => (
            <li key={index} className="product-row">
              <p>{product.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-column">
        <button className="sort-button" onClick={() => handleSort('price')}>
          Sort by Price
        </button>
        <h2>Price</h2>
        <ul>
          {sortedProducts.map((product, index) => (
            <li key={index} className="product-row">
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-column">
        <button className="sort-button" onClick={() => handleSort('category')}>
          Sort by Category
        </button>
        <h2>Category</h2>
        <ul>
          {sortedProducts.map((product, index) => (
            <li key={index} className="product-row">
              <p>{product.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
