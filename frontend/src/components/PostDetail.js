import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostDetail extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.fetchPost(postId);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {post.id}
        {post.title} <br />
        {post.author} <br />
        {post.category} <br />
        {post['timestamp']} <br />
        {post.body} <br />
        {post.voteScore} <br />
      </div>
    );
  }
}

function mapStateToProps({ post }) {
  return {
    post
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: postId => dispatch(fetchPost(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
