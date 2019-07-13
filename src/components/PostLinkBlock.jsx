import './postLinkBlock.scss';
import React from 'react';

export default ({ imageUrl, title, description, linkUrl }) => (
  <a className="gm-postLinkBlock" href={linkUrl} target="_blank" rel="noopener noreferrer" >
    <img className="gm-postLinkBlock__image" src={imageUrl} alt="" />
    <div className="gm-postLinkBlock__text">
      <h3 className="gm-postLinkBlock__title">{title}</h3>
      <p className="gm-postLinkBlock__description">{description}</p>
      <p className="gm-postLinkBlock__domain">{toDomain(linkUrl)}</p>
    </div>
  </a>
);

function toDomain(url) {
  const [, domain = ''] = /https?:\/\/([^/?]+)/.exec(url) || [];
  return domain;
}
