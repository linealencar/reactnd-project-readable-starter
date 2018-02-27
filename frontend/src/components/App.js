import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import Menu from './Menu';
import NewPost from './NewPost';
import Category from './Category';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Route exact path="/" component={Home} />
          <Route path="/addPost" component={NewPost} />
          <Route path="/react" render={() => <Category category="react" />} />
          <Route path="/redux" render={() => <Category category="redux" />} />
          <Route
            path="/udacity"
            render={() => <Category category="udacity" />}
          />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
