import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  }
}
export default App;
