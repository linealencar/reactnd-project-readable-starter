import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <ul className="posts">
        {posts.map(post => (
          <li key={post.id}>
            {post.title} <br />
            {post.author} <br />
            {post.category} <br />
            {post['timestamp']} <br />
            {post.body} <br />
            {post.voteScore} <br />
            <Link to="/postDetails">Detail</Link>
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
