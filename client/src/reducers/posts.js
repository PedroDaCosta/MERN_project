import * as constants from '../constants/actionTypes';

/*A reducer is a function that determines changes to an application's state. 
It uses the action it receives to determine this change.*/
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case constants.FETCH_ALL:
      return action.payload;
    case constants.CREATE:
      return [...state, action.payload];
    case constants.UPDATE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case constants.DELETE:
      return state.filter((post) =>
        post._id !== action.payload
      );
    case constants.LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return state;
    //break;
  }
};
