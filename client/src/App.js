/*What does useEffect do? By using this Hook, you tell React that your 
component needs to do something after render. React will remember the 
function you passed (we’ll refer to it as our “effect”), and call it later 
after performing the DOM updates. In this effect, we set the document title,
but we could also perform data fetching or call some other imperative API.*/
import React, { useEffect } from 'react';

/*Material-UI is simply a library that allows us to import and use different 
components to create a user interface in our React applications. This saves 
a significant amount of time since the developers do not need to write 
everything from scratch.*/
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

/*The useDispatch.dispatch() is the method used to dispatch actions and trigger 
state changes to the store. react-redux is simply trying to give you convenient 
access to it. Note, however, that dispatch is not available on props if you 
do pass in actions to your connect function. */
import { useDispatch } from 'react-redux';

//non-modules imports
import { getPosts } from './actions/posts';
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import logo from './assets/images/logo.png';
import useStyles from './styles';

const App = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    /*The array as second argument is a depedency array.*/
    useEffect( 
        () => {
            dispatch( getPosts() );
        }, 
        [ dispatch ]
    ); 

    return(
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">DevBlog</Typography>
                <img className={classes.images} src={logo} alt="logo" width="200" height="50"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;