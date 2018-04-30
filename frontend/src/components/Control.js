import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../actions';
import * as APIPost from '../utils/APIPost';
import Icon from 'semantic-ui-react';

class Control extends Component {
  vote(postId, voteType) {
    APIPost.votePost(postId, voteType).then(post => {
      this.props.votePost(post);
    });
  }

  deletePost(postId) {
    APIPost.deletePost(postId).then(post => {
      this.props.deletePost(post);
    });
  }

  render() {
    const { postId } = this.props;

    return (
      <div>
        <i
          class="thumbs down outline icon bordered"
          onClick={() => this.vote(postId, 'downVote')}
        />
        <i
          class="thumbs up outline icon bordered"
          onClick={() => this.vote(postId, 'upVote')}
        />
        <i
          class="trash alternate outline icon bordered"
          onClick={() => this.deletePost(postId)}
        />
        <i class="comment alternate outline icon bordered" />
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: post => dispatch(votePost(post)),
    deletePost: post => dispatch(deletePost(post))
  };
}

export default connect(null, mapDispatchToProps)(Control);
