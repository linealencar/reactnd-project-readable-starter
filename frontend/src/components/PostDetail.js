import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, loadPost } from '../actions';
import * as APIPost from '../utils/APIPost';
import mui from 'material-ui';

import GradeIcon from 'react-material-icons/icons/action/grade';

class PostDetail extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    APIPost.getPostById(postId).then(post => {
      this.props.loadPost(post);
    });
    // this.props.fetchPost(postId);

    // const { category } = this.props.match.params;
    // APIPost.getPostsByCategory(category).then(posts => {
    //   this.props.loadPosts(posts);
    // });
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

// function mapStateToProps({ post }) {
//   return {
//     post
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    loadPost: post => dispatch(loadPost(post))
    // fetchPost: post => dispatch(fetchPost(postId))
  };
}

export default connect(null, mapDispatchToProps)(PostDetail);