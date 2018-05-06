import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Control from './Control';
import { Icon, Statistic } from 'semantic-ui-react';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="App">
        <div class="ui divided items">
          {posts.map(post => (
            <div class="item" key={post.id}>
              <div class="content">
                <a class="header">
                  <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
                </a>
                <div class="meta">
                  <span class="cinema">{post.author}</span>
                </div>
                <div class="description">
                  <p>{post.body}</p>
                </div>
                <div class="extra">
                  <Statistic size="mini" color="grey">
                    <Statistic.Value>
                      <Icon name="heart" />
                      {post.voteScore}
                    </Statistic.Value>
                  </Statistic>
                  <Control postId={post.id} showAddComment={true} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      // <Accordion fluid styled>
      //   {posts.map(post => (
      //     <div key={post.id}>
      //       <Accordion.Title
      //         active={activeIndex === 0}
      //         index={0}
      //         // onClick={this.handleClick}
      //       >
      //         <br />
      //         {/* <Icon name="dropdown" />{' '} */}
      //         <Statistic size="mini" color="grey">
      //           <Statistic.Value>
      //             <Icon name="heart" />
      //             {post.voteScore}
      //           </Statistic.Value>
      //         </Statistic>
      //         <Control postId={post.id} showAddComment={true} />
      //         <br />
      //         <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
      //         <br />
      //       </Accordion.Title>

      //       <Accordion.Content active={activeIndex === 0}>
      //         <p>{post.author}</p>
      //       </Accordion.Content>
      //     </div>
      //   ))}
      // </Accordion>
    );
  }
}

function mapStateToProps({ posts, sorting }) {
  return {
    posts: posts.slice().sort((a, b) => b[sorting] - a[sorting])
  };
}

export default connect(mapStateToProps, null)(PostList);
