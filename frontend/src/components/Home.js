import React, { Component } from 'react';
import * as APIPost from '../utils/APIPost';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';
import PostList from './PostList';
import Buttons from './Buttons';

class Home extends Component {
  componentDidMount() {
    this.props.fetchPosts();
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
    fetchPosts: () => dispatch(fetchPosts())
  };
}

export default connect(null, mapDispatchToProps)(Home);
