import React, { Component } from 'react';
import * as APICategory from '../utils/APICategory';
import * as APIPost from '../utils/APIPost';
import logo from '../logo.svg';
import { loadPosts, orderPosts } from '../actions';
import { listCategory } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PostList from './PostList';
import NewPost from './NewPost';

class Home extends Component {
  componentDidMount() {
    APIPost.getAll().then(posts => {
      this.props.loadPosts(posts);
    });

    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
    });
  }

  orderPosts = sortingType => {
    this.props.orderPosts(sortingType);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>
        <Link to="/">Home</Link>
        <Link to="/addPost"> Add post </Link>
        {this.props.categories.map(categorie => (
          <Link to="`/${categorie.name}`"> {categorie.name} </Link>
        ))}
        <Route
          exact
          path="/"
          render={() => (
            <div>
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

              <PostList />
            </div>
          )}
        />
        <Route path="/addPost" render={() => <NewPost />} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
