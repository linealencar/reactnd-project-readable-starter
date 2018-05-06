import React, { Component } from 'react';
import * as APICategory from '../utils/APICategory';
import { listCategory } from '../actions';
import { connect } from 'react-redux';

class Menu extends Component {
  componentDidMount() {
    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
    });
  }
  render() {
    return (
      <div class="ui pointing menu">
        <a href="/" class="item">
          Home{' '}
        </a>
        <a href="/addPost" class="item">
          Add post
        </a>
        {this.props.categories.map(categorie => (
          <a href={`/${categorie.name}`} key={categorie.name} class="item">
            {categorie.name}
          </a>
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
