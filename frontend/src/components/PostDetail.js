import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchComments } from '../actions';
import Control from './Control';
import CommentList from './CommentList';
import { Statistic, Icon, Item } from 'semantic-ui-react';

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
      <Item>
        <Item.Content>
          <Item.Header as="span">
            <Statistic size="mini" color="grey">
              <Statistic.Value>
                <Icon name="heart" />
                {post.voteScore}
              </Statistic.Value>
            </Statistic>
            <br />
            {post.title}
            <span className="ui teal tag label">{post.category}</span>
            <br />
            <Control
              postId={post.id}
              onToggleComment={this.toggleComment}
              showCommentOption={true}
            />
            <br />
          </Item.Header>
          <Item.Description>
            <p className="display-linebreak">{post.body}</p>
          </Item.Description>
          <Item.Extra>
            <br />
            {post.author}
            <br />
            <CommentList replyOpened={opened} postId={post.id} />
          </Item.Extra>
        </Item.Content>
      </Item>
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
