import React, { Component } from 'react';
import { addPost, listCategories } from '../actions';
import { connect } from 'react-redux';
import * as APIPost from '../utils/APIPost';
import UUID from 'uuid/v1';
import { Form, Button } from 'semantic-ui-react';

// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';

class NewPost extends Component {
  state = {
    id: null,
    title: '',
    body: '',
    author: '',
    category: ''
  };

  componentDidMount() {
    this.props.listCategories();
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = event => {
    this.submitPost();
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>
          <Form.Input
            label="Body"
            placeholder="Body"
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Author"
            placeholder="Author"
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleChange}
          />
          <Form.Select
            fluid
            label="Category"
            name="category"
            type="select"
            options={this.props.categories}
            value={this.state.category}
            placeholder="Category"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Button onClick={this.closePostModal}>Cancel</Button>
      </Form>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.map(category => ({
      key: category.path,
      value: category.path,
      text: category.name
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post)),
    listCategories: () => dispatch(listCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
