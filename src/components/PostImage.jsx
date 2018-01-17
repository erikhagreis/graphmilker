import './postImage.css';
import React from 'react';

export default ({ imageUrl }) => (
  <img className="postImage" src={imageUrl} alt="" />
);
