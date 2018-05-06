import React, { Component } from 'react';
import { addPost, listCategory } from '../actions';
import { connect } from 'react-redux';
import * as APICategory from '../utils/APICategory';
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
    author: '',
    category: ''
  };

  componentDidMount() {
    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
    });
  }

  submitPost = () => {
    const post = {
      id: UUID(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
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

  handleSelectChange = (event, index, value) => {
    this.setState({
      category: value
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
            name="category"
            type="select"
            floatingLabelText="Category"
            value={this.state.category}
            onChange={this.handleSelectChange}
          >
            {this.props.categories.map(categorie => (
              <MenuItem
                value={categorie.name}
                key={categorie.name}
                primaryText={categorie.name}
              />
            ))}
          </SelectField>
          <br />
          <br />
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

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post)),
    listCategory: categories => dispatch(listCategory(categories))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
