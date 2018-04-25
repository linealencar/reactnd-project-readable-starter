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
import { withRouter } from 'react-router-dom';
import { votePost } from '../actions';
import * as APIPost from '../utils/APIPost';

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
      <List style={{ width: '60%' }}>
        {posts.map(post => (
          // <Link to={`/postDetail/${post.id}`}>
          <ListItem
            key={post.id}
            primaryText={`${post.title} - ${post.voteScore}`}
            secondaryText={post.body}
            secondaryTextLines={2}
            leftIcon={<Favorite />}
            rightIconButton={rightIconMenu}
            //onClick={() => this.detailPost(post.id)}
            onClick={() => this.vote(post.id, 'upVote')}
          />
          //</Link>
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

function mapDispatchToProps(dispatch) {
  return {
    votePost: post => dispatch(votePost(post))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostList)
);
