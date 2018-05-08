import React, { Component } from 'react';
import { connect } from 'react-redux';
import { voteComment, deleteComment } from '../actions';
import { Icon } from 'semantic-ui-react';

class ControlComment extends Component {
  vote(commentId, voteType) {
    this.props.voteComment(commentId, voteType);
  }

  delete(commentId) {
    this.props.deleteComment(commentId);
  }

  render() {
    const { commentId, onEditComment } = this.props;

    return (
      <div>
        <Icon
          color="teal"
          name="thumbs up"
          onClick={() => this.vote(commentId, 'upVote')}
        />
        <Icon
          color="teal"
          name="thumbs down"
          onClick={() => this.vote(commentId, 'downVote')}
        />
        <Icon color="teal" name="edit" onClick={onEditComment} />
        <Icon
          color="teal"
          name="trash"
          onClick={() => this.delete(commentId)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  voteComment: (commentId, voteType) =>
    dispatch(voteComment(commentId, voteType)),
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(null, mapDispatchToProps)(ControlComment);
