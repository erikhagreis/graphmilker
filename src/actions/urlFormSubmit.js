import { get } from 'lodash';
import parseUrl from 'parse-url';
import ensureDetails from './ensureDetails';
import formUpdateValue from './formUpdateValue';
import switchView from './switchView';

export default () => {
  return (dispatch, getState) => {
    const postUrlField = get(getState(), 'formData.postUrlForm.postUrl', {});
    if (!postUrlField.value) {
      return dispatch(formUpdateValue('postUrlForm', 'postUrl', '',
        `Enter a URL please.`));
    }

    const pageName = get(getState(), 'config.pageName');
    const pageId = get(getState(), `pageAuth.${pageName}.id`);
    const postId = getPostIdByPostUrl(postUrlField.value, pageName, pageId);

    if (postId) {
      return dispatch(ensureDetails(postId))
        .then(() => dispatch(switchView('postDetails', postId)));
    } else {
      return dispatch(formUpdateValue('postUrlForm', postUrlField.name, postUrlField.value,
        `Sorry, Graphmilker does not understand this input.`));
    }
  };
};

function getPostIdByPostUrl(postUrl, pageName, pageId) {
  // photo on desktop site
  // eg: https://www.facebook.com/birthofjoy/photos/a.195350553819898/1356483684373240/?type=3
  // eg: http://www.facebook.com/dewolfficial/photos/a.421091372204.202391.168546367204/10153657659302205/
  const photoUrlRegex = /\/([^/]+)\/photos\/a\.(?:\d+\.\d+\.)?\d{12,15}\/(\d{15,17})/i;
  const [ , photoPart1, photoPart2 ] = postUrl.match(photoUrlRegex) || [];
  if (photoPart1 === pageName && photoPart2) {
    return `${pageId}_${photoPart2}`;
  }

  // video in theater mode on desktop site
  // eg: https://www.facebook.com/dewolfficial/videos/vb.168546367204/10155168529917205/?type=2&theater
  const videoTheaterRegex = /\/([^/]+)\/(?:videos)\/vb.(\d{12})\/(\d{15,17})?/i;
  const [ , theaterPart1, theaterPart2, theaterPart3 ] = postUrl.match(videoTheaterRegex) || [];
  if (theaterPart1 === pageName && theaterPart2 && theaterPart3) {
    return `${theaterPart2}_${theaterPart3}`;
  }

  // video or post on desktop site
  // eg: https://www.facebook.com/dewolfficial/videos/10153768435627205/
  // eg: https://www.facebook.com/dewolfficial/posts/10153734738707205
  const desktopUrlRegex = /\/([^/]+)\/(?:videos|posts)\/(\d{15,17})\/?/i
  const [ , postPart1, postPart2 ] = postUrl.match(desktopUrlRegex) || [];
  if (postPart1 === pageName && postPart2) {
    return `${pageId}_${postPart2}`;
  }

  // video on mobile site
  // eg: https://m.facebook.com/story.php?story_fbid=10153768435627205&id=168546367204
  const queryParams = parseUrl(postUrl).query;
  if (queryParams.story_fbid && queryParams.id === pageId) {
    return `${queryParams.id}_${queryParams.story_fbid}`;
  }

  return false;
}
