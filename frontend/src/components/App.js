import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import Menu from './Menu';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import NewPost from './NewPost';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Route exact path="/" component={Home} />
          <Route path="/addPost" component={NewPost} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
