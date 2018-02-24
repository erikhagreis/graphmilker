import './postlist.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import Button from '../components/Button';
import PostSummary from '../components/PostSummary';

class PostList extends Component {
  componentDidMount() {
    if (!this.props.posts.items.length) {
      this.props.getPosts();
    }
  }

  render() {
    const {
      posts: { items = [], cursors = {} },
      getPosts,
      selectPost
    } = this.props;

    return (
      <div className="gm-postlist">
        <h2 className="gm-postlist__title gm-sectionTitle">
          Select a post from the list:
        </h2>
        <ul className="gm-postlist__list">
          {items.map(post => (
            <li className="gm-postlist__item" key={post.id}>
              <PostSummary
                postData={post}
                selectPost={() => selectPost(post.id)}
              />
            </li>
          ))}
          {cursors.after && (
            <li className="gm-postlist__item gm-postlist__item--loadMore">
              <Button onClick={() => getPosts()}>＋ Load more posts</Button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = {
  getPosts: () => actions.api.getPosts(),
  selectPost: postId => actions.showDetails(postId)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
