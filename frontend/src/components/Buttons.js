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
        <div class="ui buttons">
          <button
            class="ui button"
            onClick={() => this.orderPosts('voteScore')}
          >
            Order by Score
          </button>
          <div class="or" />
          <button
            class="ui button"
            onClick={() => this.orderPosts('timestamp')}
          >
            Order by Date
          </button>
        </div>
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
