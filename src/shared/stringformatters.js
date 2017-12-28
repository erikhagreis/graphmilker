import moment from 'moment';
import Autolinker from 'autolinker'
import { defaults } from 'lodash'

const autolinker = new Autolinker({
  urls: {
    schemeMatches: true,
    wwwMatches: true,
    tldMatches: true
  },
  email: true,
  phone: false,
  twitter: true,
  hashtag: 'facebook',
  newWindow: false
});

export const readableCreatedTime = (createdTime) => {
  let now = moment()
  var then = moment(createdTime)
  var diff = now.diff(then, 'days')

  if (diff < 1) {
    return then.fromNow()
  } else {
    return then.format('MMMM Do YYYY')
  }
};

export const messageToHtml = (message, tags = [], overrides = {}) => {
  const options = defaults({}, overrides, {
    linkify: true,
    tagify: true,
    paragraphy: true
  });

  if (options.tagify) {
    tags.reverse().forEach((tag) => {
      const link = `<a href="http://www.facebook.com/${tag.id}" target="_blank">${tag.name}</a>`
      message = message.slice(0, tag.offset) + link + message.slice(tag.offset + tag.length);
    })
  }

  if (options.linkify) {
    message = autolinker.link(message);
  }

  if (options.paragraphy) {
    message = message.split('\n\n').map((paragraph) => `<p>${paragraph}</p>`).join('');
    message = message.replace(/\n/g, '<br/>');
  }
  
  return message;
};
