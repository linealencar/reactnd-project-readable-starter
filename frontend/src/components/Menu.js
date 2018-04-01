import React, { Component } from 'react';
import * as APICategory from '../utils/APICategory';
import abstract from '../images/abstract.jpg';
import { listCategory } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

class Menu extends Component {
  componentDidMount() {
    APICategory.getAll().then(categories => {
      this.props.listCategory(categories);
    });
  }
  render() {
    return (
      <div className="App">
        <Card>
          <CardMedia
            overlay={<CardTitle title="Readable" subtitle="React Project" />}
          >
            <img src={abstract} alt="" height="100" />
          </CardMedia>
        </Card>
        <RaisedButton href="/" label="Home" primary={true} />
        <RaisedButton href="/addPost" label="Add post" secondary={true} />
        {this.props.categories.map(categorie => (
          <RaisedButton href={`/${categorie.name}`}>
            {categorie.name}{' '}
          </RaisedButton>
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
