import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import Menu from './MainMenu';
import NewPost from './NewPost';
import Category from './Category';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostDetail from './PostDetail';
import Header from './Head';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Menu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/addPost" component={NewPost} />
            <Route path="/:category/:postId" component={PostDetail} />
            <Route path="/:category" component={Category} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
