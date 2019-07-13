import './postSummary.scss';
import React from 'react';

export default ({ postData, selectPost }) => (
  <button className="gm-postSummary" onClick={selectPost}>
    <span className="gm-postSummary__label gm-label">{postData.type}</span>
    <span className="gm-postSummary__headline">{postData.message}</span>
  </button>
);
