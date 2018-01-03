import './overlay.css';
import React from 'react';
import { noop } from 'lodash';

export default ({ children, onClose = noop }) => (
  <div className="overlay">
    <div className="overlay__inner">
      <div className="overlay__content">
        <button className="overlay__closeButton" onClick={onClose}>✕<span> close</span></button>
        {children}
      </div>
    </div>
  </div>
);
