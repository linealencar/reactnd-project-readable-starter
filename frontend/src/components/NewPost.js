import React, { Component } from 'react';
import { addPost } from '../actions';
import { connect } from 'react-redux';
import * as APIPost from '../utils/APIPost';
import UUID from 'uuid/v1';
import TextField from 'material-ui/TextField';

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
    const post = {
      id: UUID(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      //category,
      voteScore: 0
    };

    APIPost.insert(post).then(post => {
      this.props.addPost(post);
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
          <TextField
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
            floatingLabelText="Body"
          />
          <br />
          <TextField
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
            floatingLabelText="Title"
          />
          <br />
          <TextField
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleInputChange}
            floatingLabelText="Author"
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

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post))
  };
}

export default connect(null, mapDispatchToProps)(NewPost);
