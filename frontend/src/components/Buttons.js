import React, { Component } from 'react';
import { orderPosts } from '../actions';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class Buttons extends Component {
  orderPosts = sortingType => {
    this.props.orderPosts(sortingType);
  };
  render() {
    return (
      <div className="App">
        <Button.Group>
          <Button onClick={() => this.orderPosts('voteScore')}>
            Order by Score
          </Button>
          <Button.Or />
          <Button onClick={() => this.orderPosts('timestamp')}>
            {' '}
            Order by Date
          </Button>
        </Button.Group>
        <br />
        <br />
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
