import React, { Component } from 'react';
import * as APICategory from '../utils/APICategory';
import logo from '../logo.svg';
import { listCategory } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Menu extends Component {
  componentDidMount() {
    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
    });
  }
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
          <Link key={categorie.name} to="`/${categorie.name}`">
            {' '}
            {categorie.name}{' '}
          </Link>
        ))}
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
    listCategory: categories => dispatch(listCategory(categories))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
