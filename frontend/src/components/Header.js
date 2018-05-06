import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <h2 class="ui block header">
        <i class="book icon" />
        <div class="content">
          Readable
          <div class="sub header">React project</div>
        </div>
      </h2>
    );
  }
}

export default Header;
