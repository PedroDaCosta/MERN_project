import * as api from "../api";
import * as constants from '../constants/actionTypes';

/*similar as the previous function in the file actions > post.js*/
export const signin = (formData, history) => async (dispatch) => {
  try{
    
    //console.log('request contend: ', formData);
    const { data } = await api.signin(formData);
    
    dispatch({ type: constants.AUTH, data });

    history.push('/');
  }catch (err) {
    console.log(err.message);
    
  }
};


/*similar as the previous function in the file actions > post.js*/
export const signup = (formData, history) => async (dispatch) => {
  try{
    
    //console.log('request contend: ', formData);
    const { data } = await api.signup(formData);
    //console.log('response contend: ', data);
    
    dispatch({ type: constants.AUTH, data });

    history.push('/');
  }catch (err) {
    console.log(err.message);
  }
};