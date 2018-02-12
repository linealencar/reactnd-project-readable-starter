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
    posts: []
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
      id: 35,
      //timestamp,
      title: 'Teste',
      body: this.input.value,
      author: 'Aline'
      //category,
      //voteScore,
      //deleted
    });

    this.input.value = '';
  };

  // orderByScore = property => {
  //   this.setState({
  //     posts: this.props.posts.sort((a, b) => b[property] - a[property])
  //   });
  // };

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

  render() {
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
        <button className="icon-btn">Add post</button>
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
        <input
          type="text"
          ref={input => (this.input = input)}
          placeholder="Add a post"
        />
        <button onClick={this.submitPost}>Submit</button>
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
