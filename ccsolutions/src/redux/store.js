import { configureStore } from '@reduxjs/toolkit';
import { SET_SEARCH_QUERY } from './searchActions';

const initialState = {
  searchQuery: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export default configureStore({
  reducer: {
    search: searchReducer,
  },
});