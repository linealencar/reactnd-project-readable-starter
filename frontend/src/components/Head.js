import React, { Component } from 'react';
import { Icon, Header } from 'semantic-ui-react';

class Head extends Component {
  render() {
    return (
      <Header as="h2" block>
        <Icon color="teal" name="book" />
        <Header.Content>
          Readable
          <Header.Subheader>React project</Header.Subheader>
        </Header.Content>
      </Header>
    );
  }
}

export default Head;
