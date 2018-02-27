import React, { Component } from 'react';
import * as APIPost from '../utils/APIPost';
import { loadPosts } from '../actions';
import { connect } from 'react-redux';
import PostList from './PostList';

class Category extends Component {
  componentDidMount() {
    const { category } = this.props;
    APIPost.getPostsByCategory(category).then(posts => {
      this.props.loadPosts(posts);
    });
  }

  render() {
    return (
      <div className="App">
        <PostList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: posts => dispatch(loadPosts(posts))
  };
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);
