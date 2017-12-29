import './postdetails.css';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import fbText2html from 'fb-text2html';
import moment from 'moment';

import actions from '../actions';
import Button from '../components/Button';

const readableCreatedTime = (createdTime) => {
  let now = moment()
  var then = moment(createdTime)
  var diff = now.diff(then, 'days')

  if (diff < 1) {
    return then.fromNow()
  } else {
    return then.format('MMMM Do YYYY')
  }
};

class PostDetails extends Component {
  componentDidMount() {
    this.props.loadDetails(this.props.postId);
  }

  render() {
    const { selectThisPost, goBack, post } = this.props;

    return <div className="postDetails">
      <div className="postDetails__header">
        <h2 className="postDetails__title sectionTitle">
          <span className="postDetails__label label">{post.type}</span>
          <span className="postDetails__postDate">posted {readableCreatedTime(post.created_time)}</span>
        </h2>
        <div className="postDetails__buttons">
          <Button onClick={() => selectThisPost(post.id)}>
            ✓ select this post
          </Button> 
          <Button onClick={goBack}>
            ◀ back
          </Button>
        </div>
      </div>
      <div className="postDetails__body" dangerouslySetInnerHTML={{
        __html: fbText2html(post.message, post.message_tags)
      }}>
      </div>
      <div className="postDetails__imageFrame">
        <img className="postDetails__image" src={post.full_picture} alt=""/>
      </div>
    </div>
  };
};

const mapStateToProps = (state) => ({
  postId: state.view.detailId,
  post: (state.posts.items).find((post) => post.id === state.view.detailId)
});

const mapDispatchToProps = {
  loadDetails: (id) => actions.api.getPostDetails(id),
  goBack: () => actions.switchView('posts'),
  selectThisPost: (id) => actions.selectPost(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);

