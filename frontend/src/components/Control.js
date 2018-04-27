import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Delete from 'material-ui/svg-icons/action/delete';
import Message from 'material-ui/svg-icons/communication/message';
import { votePost } from '../actions';
import * as APIPost from '../utils/APIPost';
import { red300, green300, blue400 } from 'material-ui/styles/colors';

class Control extends Component {
  vote(postId, voteType) {
    APIPost.votePost(postId, voteType).then(post => {
      this.props.votePost(post);
    });
  }

  render() {
    const { postId } = this.props;

    return (
      <div>
        <ThumbUp color={green300} onClick={() => this.vote(postId, 'upVote')} />{' '}
        <ThumbDown
          color={red300}
          onClick={() => this.vote(postId, 'downVote')}
        />
        <Delete color={blue400} />
        <Message color={blue400} />
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: post => dispatch(votePost(post))
  };
}

export default connect(null, mapDispatchToProps)(Control);
