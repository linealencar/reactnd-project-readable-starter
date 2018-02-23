import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostList extends Component {
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

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}
export default connect(mapStateToProps)(PostList);
