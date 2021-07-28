//START POINT OF CLIENT SIDE

/*library for building user interfaces or UI components.*/
import React from 'react';

/*ReactDOM is a package that provides DOM specific methods that can be used 
at the top level of a web app to enable an efficient way of managing DOM 
elements of the web page.*/
import ReactDOM from 'react-dom';

/*React-Redux official Redux UI binding library for React.
  The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.*/
import { Provider } from 'react-redux';

/*Redux library for managing application state.
 Redux "store" that holds the complete state tree of your app. There should only 
 be a single store in your app.
 Redux-thunk lets the action creators invert control by dispatching functions. 
 They would receive dispatch as an argument and may call it asynchronously. 
 Such functions are called thunks.*/
import { createStore, applyMiddleware, compose } from 'redux';

/*Redux Thunk is a middleware that lets you call action creators that return a 
function instead of an action object. That function receives the store's 
dispatch method, which is then used to dispatch regular synchronous actions 
inside the function's body once the asynchronous operations have been completed.*/
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

import './styles.css';

/*Creates a Redux store that holds the complete state tree of your app. 
There should only be a single store in your app.*/
const store = createStore(reducers, compose(applyMiddleware(thunk)));

/*DOM styling this can be done in the JSX with the use of react-helmet module
  //document.body.style.backgroundColor = "none";
*/

/*Applies return from function App and Provider to element 'root' of the DOM.*/
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')  
);
