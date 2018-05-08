import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Form, Header, Statistic, Icon } from 'semantic-ui-react';
import { insertComment } from '../actions';
import UUID from 'uuid/v1';
import ControlComment from './ControlComment';

class CommentList extends Component {
  state = {
    id: null,
    parentId: null,
    body: '',
    author: '',
    opened: false
  };

  componentDidMount() {
    const { replyOpened } = this.props;
    this.setState({ opened: replyOpened });
  }

  componentWillReceiveProps(nextProps) {
    const { replyOpened } = this.props;
    this.setState({ opened: replyOpened });
  }

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

  editComment = comment => {
    this.setState({ opened: true });
    //this.setState(comment);
  };
  render() {
    const { comments, replyOpened } = this.props;
    const { opened } = this.state;

    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments<a className="ui red circular label">{comments.length}</a>
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
              <Statistic size="mini" color="grey">
                <Statistic.Value>
                  <Icon name="heart" />
                  {comment.voteScore}
                </Statistic.Value>
              </Statistic>
              <br />
              <Comment.Author as="a">{comment.author}</Comment.Author>
              <Comment.Metadata>
                <ControlComment
                  commentId={comment.id}
                  onEditComment={this.editComment(comment)}
                />
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    );
  }
}

const mapStateToProps = ({ comments }) => ({
  comments: comments.slice().sort((a, b) => b['voteScore'] - a['voteScore'])
});

const mapDispatchToProps = dispatch => ({
  insertComment: comment => dispatch(insertComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
