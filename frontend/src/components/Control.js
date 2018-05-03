import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../actions';
import * as APIPost from '../utils/APIPost';
import { Icon } from 'semantic-ui-react';

class Control extends Component {
  state = {
    opened: false
  };

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

  toggleComment = () => {
    // check if box is currently opened
    const { opened } = this.state;
    this.setState({
      // toggle value of `opened`
      opened: !opened
    });
  };

  render() {
    const { postId, onToggleComment } = this.props;

    return (
      <div>
        <Icon
          circular
          color="teal"
          name="thumbs down"
          onClick={() => this.vote(postId, 'downVote')}
        />
        <Icon
          circular
          color="teal"
          name="thumbs up"
          onClick={() => this.vote(postId, 'upVote')}
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

function mapDispatchToProps(dispatch) {
  return {
    votePost: post => dispatch(votePost(post)),
    deletePost: post => dispatch(deletePost(post))
  };
}

export default connect(null, mapDispatchToProps)(Control);
