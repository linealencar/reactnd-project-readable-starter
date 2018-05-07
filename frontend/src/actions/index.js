import * as APIPost from '../utils/APIPost';
import * as APIComment from '../utils/APIComment';
import * as APICategory from '../utils/APICategory';

export const ADD_POST = 'ADD_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const ORDER_POSTS = 'ORDER_POSTS';

export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';

export const LIST_CATEGORY = 'LIST_CATEGORY';

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}
export const insertPost = post => dispatch =>
  APIPost.insert(post).then(post => dispatch(addPost(post)));

export function votePostFunction(post) {
  return {
    type: VOTE_POST,
    post
  };
}

export const votePost = (postId, voteType) => dispatch =>
  APIPost.votePost(postId, voteType).then(post =>
    dispatch(votePostFunction(post))
  );

export function deletePostFunction(post) {
  return {
    type: DELETE_POST,
    post
  };
}

export const deletePost = postId => dispatch =>
  APIPost.deletePost(postId).then(post => dispatch(deletePostFunction(post)));

export function updatePost({ id, title, body, author, category }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body,
    author,
    category
  };
}

export function loadPostsFunction(posts) {
  return {
    type: LOAD_POSTS,
    posts
  };
}

export const fetchPosts = () => dispatch =>
  APIPost.getAll().then(posts => dispatch(loadPostsFunction(posts)));

export const fetchPostsByCategory = category => dispatch =>
  APIPost.getPostsByCategory(category).then(posts =>
    dispatch(loadPostsFunction(posts))
  );

export function loadPostFunction(post) {
  return {
    type: LOAD_POST,
    post
  };
}

export const fetchPost = postId => dispatch =>
  APIPost.getPostById(postId).then(post => dispatch(loadPostFunction(post)));

export function orderPosts(sortingType) {
  return {
    type: ORDER_POSTS,
    sortingType
  };
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export const insertComment = comment => dispatch =>
  APIComment.insertComment(comment).then(comment =>
    dispatch(addComment(comment))
  );

export function voteCommentFunction(comment) {
  return {
    type: VOTE_COMMENT,
    comment
  };
}

export const voteComment = (commentId, voteType) => dispatch =>
  APIComment.voteComment(commentId, voteType).then(comment =>
    dispatch(voteCommentFunction(comment))
  );

export function deleteCommentFunction(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  };
}

export const deleteComment = commentId => dispatch =>
  APIComment.deleteComment(commentId).then(comment =>
    dispatch(deleteCommentFunction(comment))
  );

export function updateComment({ id, body, author }) {
  return {
    type: UPDATE_COMMENT,
    id,
    body,
    author
  };
}

export function loadComments(comments) {
  return {
    type: LOAD_COMMENTS,
    comments
  };
}

export const fetchComments = postId => dispatch =>
  APIComment.getAllComments(postId).then(comments =>
    dispatch(loadComments(comments))
  );

export function listCategoriesFunction(categories) {
  return {
    type: LIST_CATEGORY,
    categories
  };
}

export const listCategories = () => dispatch =>
  APICategory.getAll().then(categories =>
    dispatch(listCategoriesFunction(categories))
  );
