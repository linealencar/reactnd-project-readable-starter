import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as APIPost from '../utils/APIPost';
import Badge from 'material-ui/Badge';
import Control from './Control';

class PostList extends Component {
  detailPost(id) {
    this.props.history.push(`/postDetail/${id}`);
  }

  render() {
    const { posts } = this.props;
    return (
      <ul className="posts">
        {posts.map(post => (
          <li key={post.id} className="post">
            <Badge badgeContent={post.voteScore} primary={true}>
              <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
            </Badge>
            <br />
            {post.author} <br />
            <br />
            <Control postId={post.id} />
            <br />
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

export default connect(mapStateToProps, null)(PostList);
