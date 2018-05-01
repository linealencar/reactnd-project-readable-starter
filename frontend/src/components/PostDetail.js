import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPost, fetchComments } from '../actions';
import * as APIPost from '../utils/APIPost';
import Control from './Control';
import { Button, Comment, Form, Header, Accordion } from 'semantic-ui-react';
import UUID from 'uuid/v1';

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

  submitComment = () => {
    const comment = {
      id: UUID(),
      timestamp: Date.now(),
      // title: this.state.title,
      // body: this.state.body,
      // author: this.state.author,
      // category: this.state.category,
      voteScore: 0
    };

    // APIPost.insert(post).then(post => {
    //   this.props.addPost(post);
    // });
  };

  handleSubmit = event => {
    this.submitPost();
    event.preventDefault();
  };

  toggleComment = () => {
    // check if box is currently opened
    const { opened } = this.state;
    console.log('Opened ' + opened);
    this.setState({
      // toggle value of `opened`
      opened: !opened
    });
  };

  render() {
    const { post, comments } = this.props;
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
              <Comment.Group>
                <Header as="h3" dividing>
                  Comments
                </Header>

                {opened && (
                  <Form reply onSubmit={this.handleSubmit}>
                    <Form.TextArea />
                    <Button
                      content="Add Reply"
                      labelPosition="left"
                      icon="edit"
                      primary
                    />
                  </Form>
                )}
                {comments.map(comment => (
                  <Comment key={comment.id}>
                    <Comment.Content>
                      <Comment.Author as="a">{comment.author}</Comment.Author>
                      <Comment.Metadata>
                        <div>{comment.body}</div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.body}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                ))}
              </Comment.Group>
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
