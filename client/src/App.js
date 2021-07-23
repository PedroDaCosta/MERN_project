import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import logo from './assets/images/logo.png';
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'

const App = () => {
    
    return(
        <Container maxwidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">DevBlog</Typography>
                <img src={logo} alt="logo" width="200" height="50"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
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