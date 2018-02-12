import { LIST_CATEGORY, LIST_POST } from '../actions';
import { ADD_POST } from '../actions';
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
    case LIST_POST:
      return action.posts;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts
});
