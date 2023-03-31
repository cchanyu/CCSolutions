export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query
  };
};