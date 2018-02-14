import React, { Component } from 'react';
import * as APIPost from '../utils/APIPost';
import { connect } from 'react-redux';
import { listPost } from '../actions';

class PostList extends Component {
  componentDidMount() {
    APIPost.getAll().then(posts => {
      this.props.listPost(posts);
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
    listPost: posts => dispatch(listPost(posts))
  };
}

function mapStateToProps({ posts }) {
  return { posts };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
