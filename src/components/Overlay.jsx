import './overlay.css';
import React from 'react';
import { noop } from 'lodash';

export default ({ children, onClose = noop }) => (
  <div className="gm-overlay">
    <div className="gm-overlay__inner">
      <div className="gm-overlay__content">
        <button className="gm-overlay__closeButton" onClick={onClose}>✕<span> close</span></button>
        {children}
      </div>
    </div>
  </div>
);
