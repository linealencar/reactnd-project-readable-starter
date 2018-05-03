import React, { Component } from 'react';
import { connect } from 'react-redux';
import { voteComment, deleteComment } from '../actions';
import * as APIComment from '../utils/APIComment';
import { Icon } from 'semantic-ui-react';

class ControlComment extends Component {
  vote(commentId, voteType) {
    this.props.voteComment(commentId, voteType);
  }

  // deletePost(postId) {
  //   APIPost.deletePost(postId).then(post => {
  //     this.props.deletePost(post);
  //   });
  // }

  // toggleComment = () => {
  //   // check if box is currently opened
  //   const { opened } = this.state;
  //   this.setState({
  //     // toggle value of `opened`
  //     opened: !opened
  //   });
  // };

  render() {
    const { commentId } = this.props;

    return (
      <div>
        <Icon
          color="teal"
          name="thumbs down"
          onClick={() => this.vote(commentId, 'downVote')}
        />
        <Icon
          color="teal"
          name="thumbs up"
          onClick={() => this.vote(commentId, 'upVote')}
        />
        <Icon
          color="teal"
          name="trash"
          //onClick={() => this.deletePost(postId)}
        />
        <Icon
          color="teal"
          name="comment"
          //onClick={onToggleComment}
        />
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteComment: (commentId, voteType) =>
      dispatch(voteComment(commentId, voteType))
    //deletePost: post => dispatch(deletePost(post))
  };
}

export default connect(null, mapDispatchToProps)(ControlComment);
