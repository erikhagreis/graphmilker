import React from 'react';

import './postsummary.css';

export default ({ postData, selectPost }) => (
  <button className='postSummary' onClick={selectPost}>
    <span className='postSummary__label label'>
      {postData.type}
    </span>
    <span className='postSummary__headline'>
      {postData.message}
    </span>
  </button>
);
