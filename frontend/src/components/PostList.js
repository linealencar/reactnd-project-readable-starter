import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
//import Divider from 'material-ui/Divider';
import Favorite from 'react-material-icons/icons/action/favorite';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Detail</MenuItem>
    <MenuItem>Vote</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <List style={{ width: '60%' }}>
        {posts.map(post => (
          <ListItem
            key={post.id}
            primaryText={`${post.title} - ${post.voteScore}`}
            secondaryText={post.body}
            secondaryTextLines={2}
            leftIcon={<Favorite />}
            rightIconButton={rightIconMenu}
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
