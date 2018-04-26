import React, { Component } from 'react';
import { addPost } from '../actions';
import { connect } from 'react-redux';
import * as APIPost from '../utils/APIPost';
import UUID from 'uuid/v1';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class NewPost extends Component {
  state = {
    id: null,
    title: '',
    body: '',
    author: ''
    //category,
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
          <SelectField
            floatingLabelText="Category"
            value={this.state.value}
            onChange={this.handleInputChange}
          >
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </SelectField>
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
