import React, { Component } from 'react';
import * as APIPost from '../utils/APIPost';
import { connect } from 'react-redux';
import { loadPosts } from '../actions';

class PostList extends Component {
  componentDidMount() {
    APIPost.getAll().then(posts => {
      this.props.loadPosts(posts);
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <ul className="posts">
        {posts.map(post => (
          <li key={post.id}>
            {post.body} - {post.voteScore} - {post['timestamp']}
          </li>
        ))}
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: posts => dispatch(loadPosts(posts))
  };
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
