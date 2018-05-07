import React, { Component } from 'react';
import { listCategories } from '../actions';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class MainMenu extends Component {
  componentDidMount() {
    this.props.listCategories();
  }

  render() {
    const { history, categories } = this.props;

    return (
      <Menu pointing>
        <Menu.Item name="Home" onClick={() => history.push('/')} />
        <Menu.Item name="Add Post" onClick={() => history.push('/addPost')} />
        {categories.map(category => (
          <Menu.Item
            name={`/${category.name}`}
            key={category.name}
            onClick={() => history.push(`/${category.name}`)}
          />
        ))}
      </Menu>
    );
  }
}
const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(listCategories())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainMenu)
);
