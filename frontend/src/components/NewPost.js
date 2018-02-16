import React, { Component } from 'react';
import { addPost } from '../actions';
import { connect } from 'react-redux';

class NewPost extends Component {
  state = {
    id: null,
    //timestamp,
    title: '',
    body: '',
    author: ''
    //category,
    //voteScore,
    //deleted
  };

  submitPost = () => {
    this.props.addPost({
      id: 30,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      //category,
      voteScore: 0,
      deleted: false
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    this.submitPost();
    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
          <button className="icon-btn" onClick={this.closePostModal}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
