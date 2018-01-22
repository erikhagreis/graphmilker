import './button.css';
import React from 'react';

export default ({ children, onClick }) => (
  <button className="gm-button" onClick={onClick}>
    {children}
  </button>
);
