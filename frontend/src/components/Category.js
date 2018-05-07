import React, { Component } from 'react';
import { fetchPostsByCategory } from '../actions';
import { connect } from 'react-redux';
import PostList from './PostList';
import Buttons from './Buttons';

class Category extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchPostsByCategory(category);
  }

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps.match.params;
    if (category !== this.props.match.params.category) {
      this.props.fetchPostsByCategory(category);
    }
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
    fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category))
  };
}

export default connect(null, mapDispatchToProps)(Category);
