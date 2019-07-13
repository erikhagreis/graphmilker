import './error.scss';
import React from 'react';

export default ({type = 'unknown'}) => (
  <div className="gm-error">
    <h2 className="gm-error__title gm-sectionTitle">
      Whoops. A {type} error occurred.
    </h2>
  </div>
);
