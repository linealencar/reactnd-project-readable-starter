import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Control from './Control';
import { Icon, Statistic } from 'semantic-ui-react';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="App">
        <div class="ui divided items">
          {posts.map(post => (
            <div class="item" key={post.id}>
              <div class="content">
                <span class="header">
                  <Link to={`/postDetail/${post.id}`}>
                    {post.title}
                    <span class="ui red circular label">
                      {post.commentCount} comments
                    </span>
                  </Link>
                </span>

                <div class="meta">
                  <span class="cinema">{post.author}</span>
                </div>
                <div class="description">
                  <p>{post.body}</p>
                </div>
                <div class="extra">
                  <Statistic size="mini" color="grey">
                    <Statistic.Value>
                      <Icon name="heart" />
                      {post.voteScore}
                    </Statistic.Value>
                  </Statistic>
                  <Control postId={post.id} showAddComment={true} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}

export default connect(mapStateToProps, null)(PostList);
