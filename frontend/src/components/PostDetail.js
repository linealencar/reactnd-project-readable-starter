import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPost, fetchComments } from '../actions';
import * as APIPost from '../utils/APIPost';
import Control from './Control';
import CommentList from './CommentList';
import { Accordion } from 'semantic-ui-react';

class PostDetail extends Component {
  state = {
    opened: false
  };

  componentDidMount() {
    const { postId } = this.props.match.params;

    APIPost.getPostById(postId).then(post => {
      this.props.loadPost(post);
    });

    this.props.fetchComments(postId);
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
    const { post } = this.props;
    const { opened } = this.state;
    if (!post) return false;
    return (
      <div>
        <Accordion fluid styled>
          <div key={post.id}>
            <Accordion.Title active={true} index={0}>
              {post.title}
            </Accordion.Title>
            <Control postId={post.id} onToggleComment={this.toggleComment} />
            <Accordion.Content active={true}>
              <p>Title: {post.author}</p>
              <p>Body: {post.body}</p>
              <p>Category: {post.category}</p>
              <p>Timestamp: {post.timestamp}</p>
              <p>Vote score:{post.voteScore}</p>
              <CommentList replyOpened={opened} postId={post.id} />
            </Accordion.Content>
          </div>
        </Accordion>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: posts.find(p => (p.id = match.params.postId)),
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: post => dispatch(loadPost(post)),
    fetchComments: postId => dispatch(fetchComments(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
