import parseUrl from 'url-parse';
import ensureDetails from './ensureDetails';
import switchView from './switchView';

export default () => {
  return (dispatch, getState) => {
    const postUrl = getState().formData.postUrlForm.postUrl;
    const { pageName, pageId } = getState().config;
    const postId = getPostIdByPostUrl(postUrl, pageName, pageId);

    console.log(postUrl, pageName, pageId, postId);
    if (postId) {
      return dispatch(ensureDetails(postId))
        .then(() => dispatch(switchView('postDetails', postId)));
    } else {

    }  
  };
};

function getPostIdByPostUrl(postUrl, pageName, pageId) {
  // photo on desktop site
  // eg: http://www.facebook.com/dewolfficial/photos/a.421091372204.202391.168546367204/10153657659302205/
  const photoUrlRegex = /\d+\.\d+\.(\d{12})\/(\d{17})/
  const [ , photoPart1, photoPart2 ] = postUrl.match(photoUrlRegex) || [];
  if (photoPart1 === pageId && photoPart2) {
    return `${photoPart1}_${photoPart2}`;
  }

  // video in theater mode on desktop site
  // eg: https://www.facebook.com/dewolfficial/videos/vb.168546367204/10155168529917205/?type=2&theater
  const videoTheaterRegex = /\/([^/]+)\/(?:videos)\/vb.(\d+)\/(\d+)?/i;
  const [ , theaterPart1, theaterPart2, theaterPart3 ] = postUrl.match(videoTheaterRegex) || [];
  if (theaterPart1 === pageName && theaterPart2 && theaterPart3) {
    return `${theaterPart2}_${theaterPart3}`;
  }

  // video or post on desktop site
  // eg: https://www.facebook.com/dewolfficial/videos/10153768435627205/
  // eg: https://www.facebook.com/dewolfficial/posts/10153734738707205
  const desktopUrlRegex = /\/([^/]+)\/(?:videos|posts)\/(\d+)\/?/i
  const [ , postPart1, postPart2 ] = postUrl.match(desktopUrlRegex) || [];
  if (postPart1 === pageName && postPart2) {
    return `${pageId}_${postPart2}`;
  }

  // video on mobile site
  // eg: https://m.facebook.com/story.php?story_fbid=10153768435627205&id=168546367204
  const queryParams = parseUrl(postUrl).query;
  if (queryParams.story_fbid && queryParams.id === pageName) {
    return `${queryParams.id}_${queryParams.story_fbid}`;
  }

  return false;
}
