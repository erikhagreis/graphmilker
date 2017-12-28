import React from 'react';
import './overlay.css';

export default ({children}) => (
  <div className="overlay">
    <div className="overlay__inner">
      <div className="overlay__content">
        {children}
      </div>
    </div>
  </div>
);
