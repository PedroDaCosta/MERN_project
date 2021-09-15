/*What does useEffect do? By using this Hook, you tell React that your 
component needs to do something after render. React will remember the 
function you passed (we’ll refer to it as our “effect”), and call it later 
after performing the DOM updates. In this effect, we set the document title,
but we could also perform data fetching or call some other imperative API.*/
import React from 'react';

/*Material-UI is simply a library that allows us to import and use different 
components to create a user interface in our React applications. This saves 
a significant amount of time since the developers do not need to write 
everything from scratch.*/
import { Container } from '@material-ui/core';

import {Route, Switch, BrowserRouter} from "react-router-dom";

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    
    return(
        <BrowserRouter>
            <Container maxwidth="lg">
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
                
            </Container>
        </BrowserRouter>
    );
}

export default App;