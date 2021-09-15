/*A reducer is a function that determines changes to an application's state. 
It uses the action it receives to determine this change.*/

import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';

export default combineReducers({
  posts, auth
})