/*What does useEffect do? By using this Hook, you tell React that your 
component needs to do something after render. React will remember the 
function you passed (we’ll refer to it as our “effect”), and call it later 
after performing the DOM updates. In this effect, we set the document title,
but we could also perform data fetching or call some other imperative API.*/
import React, { useState, useEffect } from 'react';

/*Material-UI is simply a library that allows us to import and use different 
components to create a user interface in our React applications. This saves 
a significant amount of time since the developers do not need to write 
everything from scratch.*/
import { Container, Grow, Grid } from '@material-ui/core';

/*The useDispatch.dispatch() is the method used to dispatch actions and trigger 
state changes to the store. react-redux is simply trying to give you convenient 
access to it. Note, however, that dispatch is not available on props if you 
do pass in actions to your connect function. */
import { useDispatch } from 'react-redux';


//src imports
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import useStyles from "./styles";

const Home = () => {

    /** 
     * example: const [state, setState] = useState(initialState);
     * Returns a stateful value, and a function to update it.
     * During the initial render, the returned state (state) is the same as
    the value passed as the first argument (initialState).
     * The setState function is used to update the state. It accepts a new 
    state value and enqueues a re-render of the component.
     * https://reactjs.org/docs/hooks-reference.html
    */
    const [currentId, setCurrentId] =  useState(null);

    const classes = useStyles();

    const dispatch = useDispatch();


    /*The array as second argument is a depedency array.*/
    useEffect( 
        () => {
            /* This hook returns a reference to the dispatch function from 
            the Redux store. You may use it to dispatch actions as needed.*/
            dispatch( getPosts() );
        }, 
        [ dispatch ]
    ); 


  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={7}>
            {/* passes the function setCurrentId into the "component"/function The arguments are send as an array so they have to be 
                            deconstructed later on */}
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            {/* passes currentId var value into the "component"/function. 
                            The arguments are send as an array so they have to be 
                            deconstructed later on */}
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
