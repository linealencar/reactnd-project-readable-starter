import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Control from './Control';
import { Item, Icon, Statistic } from 'semantic-ui-react';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="App">
        <Item.Group divided>
          {posts.map(post => (
            <Item key={post.id} className="ui divided items">
              <Item.Content>
                <Item.Header as="span">
                  <Link to={`/${post.category}/${post.id}`}>
                    {post.title}{' '}
                    <span className="ui red circular label">
                      {post.commentCount} comments
                    </span>
                  </Link>
                </Item.Header>
                <Item.Meta>{post.author}</Item.Meta>
                <Item.Extra>
                  <Statistic size="mini" color="grey">
                    <Statistic.Value>
                      <Icon name="heart" />
                      {post.voteScore}
                    </Statistic.Value>
                  </Statistic>
                  <Control post={post} showCommentOption={false} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, sorting }) => ({
  posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
});

export default connect(mapStateToProps, null)(PostList);
