import * as api from "../api";

/**
 * Action Creators - Functions that return Actions. 
 * Actions are just objects with a type and a payload. 
 * The actions type is used to identify the action to the reducer.
 * The payload is community term to the property that holds the actual data that you need to pass to the reducer.
 */ 
/*Because we are working with asynchrous data to actually fetch all the information required some time will have to pass and for that we will have to use redux-thunk. Thunk allow us to specify with an prefix arrow funtion => a asynchronous function to call another function.*/
/*A curried function is a function which takes multiple parameters one at a time, by taking the first argument, and returning a series of functions which each take the next argument until all the parameters have been fixed, and the function application can complete, at which point, the resulting value is returned.*/
export const getPosts = () => async (dispatch) => {
  try{

    /*api.fetchPost() is a function in the api > index.js that returns a 
    promise function that in turn returns an http reponse. Then the response 
    is imediatly deconstructed with the use of the "destructuring assignment 
    syntax" that serch for the key 'data' and returns its value/s.*/
    const { data } = await api.fetchPosts();

    /*Dispatch the action to the reducer by means of the middlewear in this case redux-thunk*/
    dispatch({ type: "FETCH_ALL", payload: data });

  }catch (err) {
    console.log(err.message);
  }
};

/*similar as the previous function but use other api function*/
export const createPost = (post) => async (dispatch) => {
  try{
    
    //console.log('request contend: ', post);
    const { data } = await api.createPost(post);
    //console.log('response contend: ', data);
    
    dispatch({ type: "CREATE", payload: data });

  }catch (err) {
    console.log(err.message);
  }
};

/*similar as the previous function but use other api function*/
export const updatePost = (id, post) => async (dispatch) => {
  try{
    
    //console.log('request contend: ', post);
    const { data } = await api.updatePost(id, post);
    //console.log('response contend: ', data);
    
    dispatch({ type: "UPDATE", payload: data });

  }catch (err) {
    console.log(err.message);
  }
};

/*similar as the previous function but use other api function*/
export const deletePost = (id) => async (dispatch) => {
  try{
    
    const deletedPost = await api.deletePost(id) != null;
    //returns nothing since its not needed
    
    deletedPost && dispatch({ type: "DELETE", payload: id });

  }catch (err) {
    console.log(err.message);
  }
};

/*similar as the previous function but use other api function*/
export const likePost = (id) => async (dispatch) => {
  try{
    
    //console.log('request contend: ', post);
    const { data } = await api.likePost(id);
    //console.log('response contend: ', data);
    
    dispatch({ type: "LIKE", payload: data });

  }catch (err) {
    console.log(err.message);
  }
};
