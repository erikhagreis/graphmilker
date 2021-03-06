import './postdetails.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text2html } from 'fb-text2html';
import moment from 'moment';

import actions from '../actions';
import Button from '../components/Button';
import PostImage from '../components/PostImage';
import PostLinkBlock from '../components/PostLinkBlock'
import PostVideo from '../components/PostVideo';

const readableCreatedTime = createdTime => {
  let now = moment();
  var then = moment(createdTime);
  var diff = now.diff(then, 'days');

  if (diff < 1) {
    return then.fromNow();
  } else {
    return then.format('MMMM Do YYYY');
  }
};

class PostDetails extends Component {
  getVisual() {
    const { post } = this.props;
    if (post.type === 'video') {
      if (post.link) {
        return (
          <PostVideo iframeUrl={post.link} />
        );
      }
    } else if(post.type === 'link') {
      return (
        <PostLinkBlock
          imageUrl={post.full_picture}
          title={post.og_title}
          description={post.og_description}
          linkUrl={post.og_url}
        />
      )
    } else if (post.full_picture) {
      return (
        <PostImage imageUrl={post.full_picture} />
      );
    }
  }

  render() {
    const { selectPost, goBack, post } = this.props;

    return (
      <div className="gm-postDetails">
        <div className="gm-postDetails__header">
          <h2 className="gm-postDetails__title gm-sectionTitle">
            <span className="gm-postDetails__label gm-label">{post.type}</span>
            <span className="gm-postDetails__postDate">
              posted {readableCreatedTime(post.created_time)}
            </span>
          </h2>
          <div className="gm-postDetails__buttons">
            <Button onClick={() => selectPost(post.id)}>
              ✓ select this post
            </Button>
            <Button onClick={goBack} type="secondary">
              ◀ back
            </Button>
          </div>
        </div>
        <div
          className="gm-postDetails__body"
          dangerouslySetInnerHTML={{
            __html: text2html(post.message, post.message_tags)
          }}
        />
        <div className="gm-postDetails__footer">
          (<a href={`https://www.facebook.com/${post.id}`} target="_blank" className="gm-postDetails__link" rel="noopener noreferrer">
            Open post in Facebook
          </a>)
        </div>
        <div className="gm-postDetails__imageFrame">
          {this.getVisual()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postId: state.view.detailId,
  post: state.posts.details.find((post) => post.id === state.view.detailId)
});

const mapDispatchToProps = {
  goBack: () => actions.switchView('overview'),
  selectPost: id => actions.selectPost(id)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
