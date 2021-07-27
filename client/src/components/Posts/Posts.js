import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post'

const Posts = ()=>{
  
  /*Grabs the posts information from the state/store. The 'posts' in state.posts 
  is in direct relation to the reducers > index.js - posts field */
  const posts = useSelector( (state) => state.posts );
  
  console.log(posts);

  return(
    <>
    <h1>POSTS</h1>
    <Post />
    <Post />
    <Post />
    </>
  );

} 

export default Posts;