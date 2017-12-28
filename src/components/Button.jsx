import React from 'react';
import './button.css';

export default ({children, onClick}) => 
  <button className="button" onClick={onClick}>
    {children}
  </button>;