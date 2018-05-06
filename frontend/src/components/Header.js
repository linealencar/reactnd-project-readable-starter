import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class Header extends Component {
  render() {
    return (
      <h2 class="ui block header">
        <Icon color="teal" name="book" />

        <div class="content">
          Readable
          <div class="sub header">React project</div>
        </div>
      </h2>
    );
  }
}

export default Header;
