import React, { Component } from 'react';
import { listCategories } from '../actions';
import { connect } from 'react-redux';

class Menu extends Component {
  componentDidMount() {
    this.props.listCategories();
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
    listCategories: () => dispatch(listCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
