import './postVideo.css';
import React from 'react';

export default ({ iframeUrl = '' }) => {
  return (
    <div className="postVideo">
      <iframe 
        src={parseYoutubeLinks(iframeUrl)}
        className="postVideo__iframe" 
        scrolling="no" frameBorder="0" allowFullScreen="true">
      </iframe>
    </div>
  );
};


function parseYoutubeLinks (iframeUrl ) {
  // ie: https://youtu.be/146EmF6XFwo
  const [ , youtubeId ] = iframeUrl.match(/youtu\.be\/(\w+)/) || [];
  if (youtubeId) {
    return getYoutubeEmbedUrl(youtubeId);
  }

  // ie: "https://www.youtube.com/attribution_link?a=wRll5Cd-kp0&u=%2Fwatch%3Fv%3D8I7u1G7J9PU%26feature%3Dshare"
  const [ , uParam ] = iframeUrl.match(/youtube\.com\/attribution_link(?:.)+[?&]u=(.+)&?/) || []; 
  if (uParam) {
    const [ , youtubeId ] = decodeURIComponent(uParam).match(/[?&]v=(\w+)&?/) || [];
    if (youtubeId) {
      return getYoutubeEmbedUrl(youtubeId);
    } 
  }

  return iframeUrl;
}

function getYoutubeEmbedUrl(youtubeId) {
  return `https://www.youtube.com/embed/${youtubeId}`;
}
