import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../actions';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PostDetail from './PostDetail';

class Control extends Component {
  vote(postId, voteType) {
    this.props.votePost(postId, voteType);
  }

  deletePost(postId) {
    const { history } = this.props;
    this.props.deletePost(postId);
    history.push('/');
  }

  render() {
    const {
      postId,
      onToggleComment,
      showCommentOption,
      history,
      post
    } = this.props;

    return (
      <div>
        <Icon
          circular
          color="teal"
          name="thumbs up"
          onClick={() => this.vote(postId, 'upVote')}
        />
        <Icon
          circular
          color="teal"
          name="thumbs down"
          onClick={() => this.vote(postId, 'downVote')}
        />
        <Icon
          circular
          color="teal"
          name="edit"
          onClick={() =>
            history.push({
              pathname: '/addPost',
              state: {
                post: post
              }
            })
          }
        />
        <Icon
          circular
          color="teal"
          name="trash"
          onClick={() => this.deletePost(postId)}
        />
        {showCommentOption && (
          <Icon
            circular
            color="teal"
            name="comment"
            onClick={onToggleComment}
          />
        )}
        <br />
      </div>
    );
  }
}
const mapStateToProps = ({ post }) => ({
  post
});

const mapDispatchToProps = dispatch => ({
  votePost: (postId, voteType) => dispatch(votePost(postId, voteType)),
  deletePost: postId => dispatch(deletePost(postId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Control)
);
