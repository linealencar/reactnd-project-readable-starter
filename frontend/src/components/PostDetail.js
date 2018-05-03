import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPost, fetchComments } from '../actions';
import * as APIPost from '../utils/APIPost';
import Control from './Control';
import CommentList from './CommentList';
import { Accordion, Statistic, Icon } from 'semantic-ui-react';

class PostDetail extends Component {
  state = {
    opened: false
  };

  componentDidMount() {
    const { postId } = this.props.match.params;

    APIPost.getPostById(postId).then(post => {
      this.props.loadPost(post);
    });

    this.props.fetchComments(postId);
  }

  toggleComment = () => {
    // check if box is currently opened
    const { opened } = this.state;
    this.setState({
      // toggle value of `opened`
      opened: !opened
    });
  };

  render() {
    const { post } = this.props;
    const { opened } = this.state;
    if (!post) return false;
    return (
      <div>
        <Accordion fluid styled>
          <div key={post.id}>
            <Accordion.Title active={true} index={0}>
              <Statistic size="mini" color="grey">
                <Statistic.Value>
                  <Icon name="heart" />
                  {post.voteScore}
                </Statistic.Value>
              </Statistic>
              <br />
              {post.title} <a class="ui teal tag label">{post.category}</a>
            </Accordion.Title>
            <Accordion.Content active={true}>
              <Control postId={post.id} onToggleComment={this.toggleComment} />
              <div class="ui divided selection list">
                <a class="item">
                  <div class="ui teal horizontal label">Author</div>
                  {post.author}
                </a>
                <a class="item">
                  <div class="ui teal horizontal label">Body</div>
                  {post.body}{' '}
                </a>
                <a class="item">
                  <div class="ui teal horizontal label">Timestamp</div>
                  {post.timestamp}
                </a>
              </div>
              <CommentList replyOpened={opened} postId={post.id} />
            </Accordion.Content>
          </div>
        </Accordion>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: posts.find(p => (p.id = match.params.postId)),
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: post => dispatch(loadPost(post)),
    fetchComments: postId => dispatch(fetchComments(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
