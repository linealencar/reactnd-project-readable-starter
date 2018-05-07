import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Form, Header, Statistic, Icon } from 'semantic-ui-react';
import { insertComment } from '../actions';
import UUID from 'uuid/v1';
import ControlComment from './ControlComment';

class CommentList extends Component {
  state = {
    opened: false,
    id: null,
    parentId: null,
    body: '',
    author: ''
  };

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  submitComment = () => {
    const { postId } = this.props;
    const comment = {
      id: UUID(),
      parentId: postId,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author
    };
    this.props.insertComment(comment);
  };

  handleSubmit = event => {
    this.submitComment();
    event.preventDefault();
  };
  render() {
    const { comments, replyOpened } = this.props;
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments<a class="ui red circular label">{comments.length}</a>
        </Header>

        {replyOpened && (
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
              <Statistic size="mini" color="grey">
                <Statistic.Value>
                  <Icon name="heart" />
                  {comment.voteScore}
                </Statistic.Value>
              </Statistic>
              <br />
              <Comment.Author as="a">{comment.author}</Comment.Author>
              <Comment.Metadata>
                <ControlComment commentId={comment.id} />
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    insertComment: comment => dispatch(insertComment(comment))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
