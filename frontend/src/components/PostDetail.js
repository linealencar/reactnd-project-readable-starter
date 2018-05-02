import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPost, fetchComments, insertComment } from '../actions';
import * as APIPost from '../utils/APIPost';
import Control from './Control';
import { Button, Comment, Form, Header, Accordion } from 'semantic-ui-react';
import UUID from 'uuid/v1';

class PostDetail extends Component {
  state = {
    opened: false,
    id: null,
    parentId: null,
    body: '',
    author: ''
  };

  componentDidMount() {
    const { postId } = this.props.match.params;

    APIPost.getPostById(postId).then(post => {
      this.props.loadPost(post);
    });

    this.props.fetchComments(postId);
  }

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  submitComment = () => {
    const { post } = this.props;
    const comment = {
      id: UUID(),
      parentId: post.id,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      voteScore: 0
    };
    //console.log(comment);

    this.props.insertComment(comment);
  };

  handleSubmit = event => {
    this.submitComment();
    event.preventDefault();
  };

  toggleComment = () => {
    // check if box is currently opened
    const { opened } = this.state;
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
                    <Form.TextArea
                      placeholder="Comment here"
                      name="body"
                      value={this.state.body}
                      onChange={this.handleInputChange}
                    />
                    <Form.Field>
                      <label>Author: </label>
                      <Form.Input
                        placeholder="Author"
                        name="author"
                        value={this.state.author}
                        onChange={this.handleInputChange}
                      />
                    </Form.Field>
                    <Form.Button content="Submit" />
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
    fetchComments: postId => dispatch(fetchComments(postId)),
    insertComment: comment => dispatch(insertComment(comment))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
