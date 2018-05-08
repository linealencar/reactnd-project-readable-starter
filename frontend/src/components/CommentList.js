import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Form, Header, Statistic, Icon } from 'semantic-ui-react';
import { insertComment, updateComment } from '../actions';
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
      id: this.state.id === null ? UUID() : this.state.id,
      parentId: postId,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author
    };
    if (this.state.id === null) {
      this.props.insertComment(comment);
    } else {
      this.props.updateComment(comment.id, comment.body);
    }
  };

  handleSubmit = event => {
    this.submitComment();
    event.preventDefault();
    this.setState({
      body: '',
      author: ''
    });
  };

  editComment = comment => {
    this.setState({
      opened: true,
      id: comment.id,
      body: comment.body,
      author: comment.author
    });
  };
  render() {
    const { comments } = this.props;
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
                  onEditComment={() => this.editComment(comment)}
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
  insertComment: comment => dispatch(insertComment(comment)),
  updateComment: (id, body) => dispatch(updateComment(id, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
