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
    const { index, active, postid } = titleProps;

    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { posts, comments } = this.props;
    return (
      <Accordion fluid styled>
        {posts.map(post => (
          <div key={post.id}>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              postid={post.id}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />{' '}
              <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
              <br />
              <Control postId={post.id} showAddComment={true} />
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 0}>
              <p>{post.author}</p>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}

export default connect(mapStateToProps, null)(PostList);
