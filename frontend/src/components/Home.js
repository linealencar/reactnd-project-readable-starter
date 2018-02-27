import React, { Component } from 'react';
import * as APIPost from '../utils/APIPost';
import { loadPosts } from '../actions';
import { connect } from 'react-redux';
import PostList from './PostList';
import Buttons from './Buttons';

class Home extends Component {
  componentDidMount() {
    APIPost.getAll().then(posts => {
      this.props.loadPosts(posts);
    });
  }

  render() {
    return (
      <div className="App">
        <Buttons />
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
