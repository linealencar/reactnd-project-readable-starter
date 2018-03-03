import * as APIPost from '../utils/APIPost';

export const ADD_POST = 'ADD_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const ORDER_POSTS = 'ORDER_POSTS';

export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const LIST_COMMENT = 'LIST_COMMENT';

export const LIST_CATEGORY = 'LIST_CATEGORY';

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function votePost({ id }) {
  return {
    type: VOTE_POST,
    id
  };
}

export function deletePost({ id }) {
  return {
    type: DELETE_POST,
    id
  };
}

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

export function loadPosts(posts) {
  return {
    type: LOAD_POSTS,
    posts
  };
}

export const fetchPosts = () => dispatch =>
  APIPost.getAll().then(posts => dispatch(loadPosts(posts)));

export function orderPosts(sortingType) {
  return {
    type: ORDER_POSTS,
    sortingType
  };
}

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function voteComment({ id }) {
  return {
    type: VOTE_COMMENT,
    id
  };
}

export function deleteComment({ id }) {
  return {
    type: DELETE_COMMENT,
    id
  };
}

export function updateComment({ id, body, author }) {
  return {
    type: UPDATE_COMMENT,
    id,
    body,
    author
  };
}

export function listComment() {
  return {
    type: LIST_COMMENT
  };
}

export function listCategory(categories) {
  return {
    type: LIST_CATEGORY,
    categories
  };
}
