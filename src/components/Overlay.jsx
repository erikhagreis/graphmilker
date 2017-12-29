import './overlay.css';
import React from 'react';

export default ({ children }) => (
  <div className="overlay">
    <div className="overlay__inner">
      <div className="overlay__content">{children}</div>
    </div>
  </div>
);
