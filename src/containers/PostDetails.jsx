import './postdetails.css';

import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as format from '../shared/stringformatters';
import actions from '../actions';
import Button from '../components/Button';

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
          <span className="postDetails__postDate">posted {format.readableCreatedTime(post.created_time)}</span>
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
        __html: format.messageToHtml(post.message, post.message_tags)
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
