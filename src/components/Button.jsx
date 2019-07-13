import './button.scss';
import React from 'react';

export default ({ children, onClick, type }) => (
  <button className={`gm-button ${type==='secondary' ? 'gm-button--secondary' : ''}`} onClick={onClick}>
    {children}
  </button>
);
