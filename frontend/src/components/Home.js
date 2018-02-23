import React, { Component } from 'react';
import * as APIPost from '../utils/APIPost';
import { loadPosts, orderPosts } from '../actions';
import { connect } from 'react-redux';
import PostList from './PostList';

class Home extends Component {
  componentDidMount() {
    APIPost.getAll().then(posts => {
      this.props.loadPosts(posts);
    });
  }

  orderPosts = sortingType => {
    this.props.orderPosts(sortingType);
  };

  render() {
    return (
      <div className="App">
        <button
          className="icon-btn"
          onClick={() => this.orderPosts('voteScore')}
        >
          Order by Score
        </button>
        <button
          className="icon-btn"
          onClick={() => this.orderPosts('timestamp')}
        >
          Order by Date
        </button>

        <PostList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    orderPosts: sortingType => dispatch(orderPosts(sortingType)),
    loadPosts: posts => dispatch(loadPosts(posts))
  };
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
