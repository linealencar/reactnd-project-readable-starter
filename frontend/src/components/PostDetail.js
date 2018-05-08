import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchComments } from '../actions';
import Control from './Control';
import CommentList from './CommentList';
import { Accordion, Statistic, Icon } from 'semantic-ui-react';

class PostDetail extends Component {
  state = {
    opened: false
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.fetchPost(postId);
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
              {post.title}
              <a className="ui teal tag label">{post.category}</a>
            </Accordion.Title>
            <Accordion.Content active={true}>
              <Control
                postId={post.id}
                onToggleComment={this.toggleComment}
                showCommentOption={true}
              />
              <div className="ui divided selection list">
                <a className="item">
                  <div className="ui teal horizontal label">Author</div>
                  {post.author}
                </a>
                <a className="item">{post.body} </a>
                <a className="item">
                  <div className="ui teal horizontal label">Date</div>
                  {new Date(post.timestamp).toLocaleDateString()}
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

const mapStateToProps = ({ posts }, { match }) => ({
  post: posts.find(p => (p.id = match.params.postId))
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  fetchComments: postId => dispatch(fetchComments(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
