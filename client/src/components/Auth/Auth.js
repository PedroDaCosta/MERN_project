import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Input from "./Input";
import Icon from "./icon";

import { signin, signup } from "../../actions/auth";

import useStyles from "./styles";

const initialState = {firstName:'', lastName:'', email:'', password:'', passwordConfirmation:''};

const Auth = () => {
  const classes = useStyles();
  //const isSignup = false;
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})

  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevSignup) => !prevSignup);
    setShowPassword(false);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);

    if(isSignup){
      dispatch(signup(formData, history));
    }else{
      dispatch(signin(formData, history));
    }
  };

  const googleSuccess = async (res)=>{
    console.log(res);
    const result = res?.profileObj; //the same as "const result = res ? res : undefined"
    const token = res?.tokenId;

    try{
      dispatch({type: "AUTH", data: {result, token}});
      
      history.push('/');
    }catch(err){
      console.log(err.message);
    }
  }
  
  const googleFailure = (err)=>{
    console.log(err);
    console.log("Google Login Failure");
  }  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  isHalf
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  isHalf
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="emai"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="passwordConfirmation"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="646658069102-283qgmv2sp82mju086d3qdotnqnl78kl.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            />
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
