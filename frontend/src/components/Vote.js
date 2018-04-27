import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { votePost } from '../actions';
import * as APIPost from '../utils/APIPost';
import { red300, green300 } from 'material-ui/styles/colors';

class Vote extends Component {
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

export default connect(null, mapDispatchToProps)(Vote);
