import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments } from '../actions';
import Badge from 'material-ui/Badge';
import Control from './Control';
import {
  Button,
  Comment,
  Form,
  Header,
  List,
  ListContent,
  Accordion,
  Icon
} from 'semantic-ui-react';

class PostList extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index, active, postId } = titleProps;

    this.props.fetchComments(postId);

    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    console.log(newIndex);

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { posts, comments } = this.props;
    console.log(comments);
    return (
      <Accordion fluid styled>
        {posts.map(post => (
          <div key={post.id}>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              postId={post.id}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 0}>
              <p>{post.author}</p>
              <Control postId={post.id} />
              <Comment.Group>
                <Header as="h3" dividing>
                  Comments
                </Header>
                {comments.map(comment => (
                  <Comment>
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
        ))}
      </Accordion>
    );
  }
}

function mapStateToProps({ posts, comments, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting]),
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: postId => dispatch(fetchComments(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
