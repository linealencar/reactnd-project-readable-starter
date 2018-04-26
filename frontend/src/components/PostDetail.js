import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPost } from '../actions';
import * as APIPost from '../utils/APIPost';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class PostDetail extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    APIPost.getPostById(postId).then(post => {
      this.props.loadPost(post);
    });
  }

  render() {
    const { post } = this.props;
    if (!post) return false;
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Author</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Timestamp</TableHeaderColumn>
              <TableHeaderColumn>Body</TableHeaderColumn>
              <TableHeaderColumn>VoteScore</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>{post.id}</TableRowColumn>
              <TableRowColumn>{post.title}</TableRowColumn>
              <TableRowColumn>{post.author}</TableRowColumn>
              <TableRowColumn>{post.category}</TableRowColumn>
              <TableRowColumn>{post['timestamp']}</TableRowColumn>
              <TableRowColumn>{post.body}</TableRowColumn>
              <TableRowColumn>{post.voteScore}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({ posts }, { match }) {
  return {
    post: posts.find(p => (p.id = match.params.postId))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: post => dispatch(loadPost(post))
    // fetchPost: post => dispatch(fetchPost(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
