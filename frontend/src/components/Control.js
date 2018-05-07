import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../actions';
import { Icon } from 'semantic-ui-react';

class Control extends Component {
  vote(postId, voteType) {
    this.props.votePost(postId, voteType);
  }

  deletePost(postId) {
    this.props.deletePost(postId);
  }

  render() {
    const { postId, onToggleComment } = this.props;

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
          name="trash"
          onClick={() => this.deletePost(postId)}
        />
        <Icon circular color="teal" name="comment" onClick={onToggleComment} />
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  votePost: (postId, voteType) => dispatch(votePost(postId, voteType)),
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(null, mapDispatchToProps)(Control);
