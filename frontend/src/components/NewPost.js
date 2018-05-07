import React, { Component } from 'react';
import { insertPost, listCategories } from '../actions';
import { connect } from 'react-redux';
import UUID from 'uuid/v1';
import { Form, Button, Container, Message } from 'semantic-ui-react';

class NewPost extends Component {
  state = {
    id: null,
    title: '',
    body: '',
    author: '',
    category: '',
    success: false
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

    this.props.insertPost(post);
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = event => {
    this.submitPost();
    event.preventDefault();
    this.setState({
      title: '',
      body: '',
      author: '',
      category: '',
      success: true
    });
  };

  render() {
    const { success } = this.state;
    return (
      <Container>
        <Form success onSubmit={this.handleSubmit}>
          {success && (
            <Message
              success
              header="Form Completed"
              content="You have sent the post"
            />
          )}
          <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
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
          <Form.TextArea
            label="Body"
            placeholder="Body"
            name="body"
            type="text"
            autoHeight
            value={this.state.body}
            onChange={this.handleChange}
          />

          <Button type="submit">Submit</Button>
          <Button onClick={this.closePostModal}>Cancel</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.map(category => ({
    key: category.path,
    value: category.path,
    text: category.name
  }))
});

const mapDispatchToProps = dispatch => ({
  insertPost: post => dispatch(insertPost(post)),
  listCategories: () => dispatch(listCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
