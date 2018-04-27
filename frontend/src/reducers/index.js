import {
  LIST_CATEGORY,
  LOAD_POSTS,
  ORDER_POSTS,
  LOAD_POST,
  VOTE_POST,
  ADD_POST,
  DELETE_POST
} from '../actions';
import { combineReducers } from 'redux';

function categories(state = [], action) {
  switch (action.type) {
    case LIST_CATEGORY:
      return action.categories;
    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return state.concat(action.post);
    case LOAD_POST:
      return [action.post];
    case LOAD_POSTS:
      return action.posts;
    case VOTE_POST:
      return state
        .filter(post => post.id !== action.post.id)
        .concat(action.post);
    case DELETE_POST:
      return state.filter(post => post.id !== action.post.id);
    default:
      return state;
  }
}

function sorting(state = 'voteScore', action) {
  switch (action.type) {
    case ORDER_POSTS:
      return action.sortingType;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  sorting
});
