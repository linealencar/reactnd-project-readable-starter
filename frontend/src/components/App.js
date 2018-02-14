import React, { Component } from 'react';
import * as APICategory from '../utils/APICategory';
import * as APIPost from '../utils/APIPost';
import logo from '../logo.svg';
import '../App.css';
import { addPost, listPost } from '../actions';
import { listCategory } from '../actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class App extends Component {
  state = {
    categories: [],
    posts: [],
    postModalOpen: false,
    id: null,
    //timestamp,
    title: '',
    body: '',
    author: ''
    //category,
    //voteScore,
    //deleted
  };

  componentDidMount() {
    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
    });

    APIPost.getAll().then(posts => {
      this.props.listPost(posts);
    });
  }
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

    //this.input.value = '';
  };

  orderByScore = () => {
    this.setState({
      posts: this.props.posts.sort((a, b) => b.voteScore - a.voteScore)
    });
  };

  orderByDate = () => {
    this.setState({
      posts: this.props.posts.sort((a, b) => b.timestamp - a.timestamp)
    });
  };

  openPostModal = () => this.setState(() => ({ postModalOpen: true }));

  closePostModal = () =>
    this.setState(() => ({
      postModalOpen: false,
      title: '',
      body: '',
      author: ''
    }));

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
    this.closePostModal();
    event.preventDefault();
  };

  render() {
    const { postModalOpen } = this.state;
    const { posts } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>
        <button className="icon-btn" onClick={this.orderByScore}>
          Order by Score
        </button>
        <button className="icon-btn" onClick={this.orderByDate}>
          Order by Date
        </button>
        <button className="icon-btn" onClick={this.openPostModal}>
          Add post
        </button>
        <ul className="categories">
          {this.props.categories.map(categorie => (
            <li key={categorie.name}>{categorie.name}</li>
          ))}
        </ul>
        <ul className="posts">
          {posts.map(post => (
            <li key={post.id}>
              {post.body} - {post.voteScore} - {post['timestamp']}
            </li>
          ))}
        </ul>

        <Modal
          className="modal"
          isOpen={postModalOpen}
          overlayClassName="overlay"
          onRequestClose={this.closePostModal}
          contentLabel="Modal"
        >
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
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post)),
    listCategory: categories => dispatch(listCategory(categories)),
    listPost: posts => dispatch(listPost(posts))
  };
}

function mapStateToProps({ posts, categories }) {
  return { posts, categories };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
