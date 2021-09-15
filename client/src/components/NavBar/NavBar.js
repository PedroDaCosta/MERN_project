import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from 'jwt-decode';

import logo from "../../assets/images/gallery_icon.png";

import useStyle from "./style";

const NavBar = () => {
  const classes = useStyle();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>
    { 
      //JWT - Java Web Token... 
      const token = user?.token;
      if(token){

        const decodedToken = decode(token);
        console.log("token expires: ", (decodedToken.exp - Math.floor(new Date().getTime()/1000))%60, "min");
        if(decodedToken.exp*1000 < new Date().getTime()){
          logout();
        }
      }
      
      setUser(JSON.parse(localStorage.getItem("profile")));
    }, 
    [location]);

  const logout = () => {
    dispatch({type: "LOGOUT"})
    
    setUser(null);
    
    history.push('/');
    
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          DevBlog
        </Typography>
        <img
          className={classes.image}
          src={logo}
          alt="logo"
          width="50"
          height="50"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className={classes.profile}>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              className={classes.logout}
              color="primary"
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
