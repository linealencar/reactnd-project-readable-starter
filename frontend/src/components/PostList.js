import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { red300, green300 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import { votePost } from '../actions';
import * as APIPost from '../utils/APIPost';
import Badge from 'material-ui/Badge';

class PostList extends Component {
  detailPost(id) {
    this.props.history.push(`/postDetail/${id}`);
  }

  vote(postId, voteType) {
    APIPost.votePost(postId, voteType).then(post => {
      this.props.votePost(post);
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <ul className="posts">
        {posts.map(post => (
          <li key={post.id} className="post">
            <Badge badgeContent={post.voteScore} primary={true}>
              <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
            </Badge>
            <br />
            {post.author} <br />
            <br />
            <ThumbUp
              color={green300}
              onClick={() => this.vote(post.id, 'upVote')}
            />{' '}
            <ThumbDown
              color={red300}
              onClick={() => this.vote(post.id, 'downVote')}
            />
            <br />
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: post => dispatch(votePost(post))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
