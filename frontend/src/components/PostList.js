import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Control from './Control';
import { Accordion, Icon, Statistic } from 'semantic-ui-react';

class PostList extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index, active, postid } = titleProps;

    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { posts, comments } = this.props;
    return (
      <Accordion fluid styled>
        {posts.map(post => (
          <div key={post.id}>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              // onClick={this.handleClick}
            >
              <br />
              {/* <Icon name="dropdown" />{' '} */}
              <Statistic size="mini" color="grey">
                <Statistic.Value>
                  <Icon name="heart" />
                  {post.voteScore}
                </Statistic.Value>
              </Statistic>
              <Control postId={post.id} showAddComment={true} />
              <br />
              <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
              <br />
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 0}>
              <p>{post.author}</p>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}

export default connect(mapStateToProps, null)(PostList);
