import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import Menu from './Menu';
import NewPost from './NewPost';
import Category from './Category';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import PostDetail from './PostDetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Menu />
            <Route exact path="/" component={Home} />
            <Route path="/addPost" component={NewPost} />
            {/* <Route path="/react" render={() => <Category category="react" />} />
          <Route path="/redux" render={() => <Category category="redux" />} />
          <Route
          path="/udacity"
          render={() => <Category category="udacity" />}
        /> */}
            <Route path="/:category" component={Category} />
            <Route path="/postDetail/:postId" component={PostDetail} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
