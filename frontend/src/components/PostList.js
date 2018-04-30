import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as APIPost from '../utils/APIPost';
import Badge from 'material-ui/Badge';
import Control from './Control';
import {
  Button,
  Comment,
  Form,
  Header,
  List,
  ListContent
} from 'semantic-ui-react';

class PostList extends Component {
  detailPost(id) {
    this.props.history.push(`/postDetail/${id}`);
  }

  render() {
    const { posts } = this.props;
    return (
      <List divided relaxed>
        {posts.map(post => (
          <List.Item key={post.id}>
            <List.Icon
              name="genderless"
              color="grey"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header as="a">
                {/* <Badge badgeContent={post.voteScore} primary={true}> */}
                <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
                {/* </Badge> */}
              </List.Header>
              <List.Description as="a">{post.author} </List.Description>
            </List.Content>
            <br />
            <Control postId={post.id} />
            <Comment.Group>
              <Header as="h3" dividing>
                Comments
              </Header>
              <Comment>
                <Comment.Content>
                  <Comment.Author as="a">Matt</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>How artistic!</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </List.Item>
        ))}
      </List>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}

export default connect(mapStateToProps, null)(PostList);
