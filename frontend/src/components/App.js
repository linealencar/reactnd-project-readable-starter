import React, { Component } from 'react';
import * as APICategory from '../utils/APICategory';
import * as APIPost from '../utils/APIPost';
import logo from '../logo.svg';
import '../App.css';
import { addPost, loadPosts, orderPosts } from '../actions';
import { listCategory } from '../actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PostList from './PostList';

class App extends Component {
  state = {
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
    APIPost.getAll().then(posts => {
      this.props.loadPosts(posts);
    });

    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
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
  };

  orderPosts = sortingType => {
    this.props.orderPosts(sortingType);
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
        <button className="icon-btn" onClick={this.openPostModal}>
          Add post
        </button>
        <ul className="categories">
          {this.props.categories.map(categorie => (
            <li key={categorie.name}>{categorie.name}</li>
          ))}
        </ul>
        <PostList />

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
    orderPosts: sortingType => dispatch(orderPosts(sortingType)),
    loadPosts: posts => dispatch(loadPosts(posts))
  };
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
