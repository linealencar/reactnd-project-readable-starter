import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import Menu from './Menu';
import NewPost from './NewPost';
import Category from './Category';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostDetail from './PostDetail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <MuiThemeProvider>
            <Header />
            <Menu />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/addPost" component={NewPost} />
              <Route path="/postDetail/:postId" component={PostDetail} />
              <Route path="/:category" component={Category} />
            </Switch>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
