import './overview.scss';

import React from 'react';
import PostList from '../containers/PostList';
import PostUrlForm from '../containers/PostUrlForm';

export default () => (
  <div className="gm-overview">
    <PostUrlForm />
    <PostList />
  </div>
);
