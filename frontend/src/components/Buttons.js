import React, { Component } from 'react';
import { orderPosts } from '../actions';
import { connect } from 'react-redux';

class Buttons extends Component {
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
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    orderPosts: sortingType => dispatch(orderPosts(sortingType))
  };
}

export default connect(null, mapDispatchToProps)(Buttons);
