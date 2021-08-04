import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';

import Post from './Post/Post'

import useStyles from './styles';

const Posts = ({ setCurrentId })=>{
  
  /*Grabs the posts information from the state/store. The 'posts' in state.posts 
  is in direct relation to the reducers > index.js - posts field */
  const posts = useSelector( (state) => state.posts );
  
  console.log(posts);

  const classes = useStyles();

  //curly braces indicate the use of JavaScript logic inside an JSX
  return(
    
    !posts.length ? <CircularProgress />:
      (<Grid className={classes.mainContainer} container alignItems="stretch" spacing={3} >
        {
          /* map() method is like a for loop more akin to a foreach loop really */
          posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6}>
              {/* passes the function "post" as funtion argument to the 
              "element"/function "Post" */}
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))

        }
      </Grid>
    )
  );

} 

export default Posts;