import React, { Component } from 'react';
import { orderPosts } from '../actions';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class Buttons extends Component {
  orderPosts = sortingType => {
    this.props.orderPosts(sortingType);
  };
  render() {
    return (
      <div className="App">
        <FlatButton
          href="https://github.com/callemall/material-ui"
          target="_blank"
          secondary={true}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
        />
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
