import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionGrade from 'react-material-icons/icons/action/grade';
import Favorite from 'react-material-icons/icons/action/favorite';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <List style={{ width: '40%' }}>
        {posts.map(post => (
          <ListItem
            primaryText={post.title}
            secondaryText={post.body}
            secondaryTextLines={2}
            rightIcon={<Favorite />}
          />
        ))}
      </List>
      // <ul className="posts">
      //   {posts.map(post => (
      //     <li key={post.id}>
      //       {post.title} <br />
      //       {post.author} <br />
      //       {post.category} <br />
      //       {post['timestamp']} <br />
      //       {post.body} <br />
      //       {post.voteScore} <br />
      //       <Link to={`/postDetail/${post.id}`}>Detail</Link>
      //     </li>
      //   ))}
      // </ul>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}
export default connect(mapStateToProps)(PostList);
