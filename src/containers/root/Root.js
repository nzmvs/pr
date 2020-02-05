import React from 'react';
import Category from '../category/Category';
import './Root.scss';

export default function App() {
  return (
    <div>
      <header className="header">
        <strong className="header__pricerunner">PriceRunner</strong>
      </header>
      <div className="container">
        <div className="content">
          <Category />
        </div>
      </div>
    </div>
  );
}
