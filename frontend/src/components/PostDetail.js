import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPost } from '../actions';
import * as APIPost from '../utils/APIPost';

class PostDetail extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    APIPost.getPostById(postId).then(post => {
      this.props.loadPost(post);
    });
  }

  render() {
    const { post } = this.props;
    if (!post) return false;
    return (
      <div>
        <table className="postDetail">
          <caption>Post Detail</caption>
          <tr>
            <th>ID</th>
            <td>{post.id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{post.title}</td>
          </tr>
          <tr>
            <th>Author</th>
            <td>{post.author}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{post.category}</td>
          </tr>
          <tr>
            <th>Timestamp</th>
            <td>{post.timestamp}</td>
          </tr>
          <tr>
            <th>Body</th>
            <td>{post.body}</td>
          </tr>
          <tr>
            <th>VoteScore</th>
            <td>{post.voteScore}</td>
          </tr>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ posts }, { match }) {
  return {
    post: posts.find(p => (p.id = match.params.postId))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: post => dispatch(loadPost(post))
    // fetchPost: post => dispatch(fetchPost(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
