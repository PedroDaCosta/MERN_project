import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux'

import { TextField, Button, Typography, Paper } from '@material-ui/core';

import { createPost } from '../../actions/posts';

const Form = ()=>{
  
  /*Creates a object that is passed as argumento into useState. useState is a Hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (postData) and another function to update this value (setPostData).*/
  const [ postData, setPostData ] = useState({
    creator: '', 
    title:'', 
    message:'', 
    tags:'', 
    selectedFile:'',
  });

  const dispatch = useDispatch();

  /*after submit we want to send a post request with all the data that the user filled in*/
  const handleSubmit = (e)=>{
    /*disable refresh on the browser once submit is send*/
    e.preventDefault();
    dispatch(createPost(postData));
  };

  const clear = () => {};

  return(
    <Paper>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Memory</Typography>
        {/* value={postData.creator} 
        gets the current value of creator from the postData object */}
        {/* onChange={ (e) => setPostData({ ...postData, creator: e.target.value })}
        on value change set the value to the "postData.creator" to the value in the input field. Notice the use of "...postData" this is usefull to append a value to a field instead of rewriting the whole object with just that field and value*/}
        <TextField 
          name="creator" 
          variant="outlined" 
          label="Creator" 
          fullWidth
          value={postData.creator}
          onChange={ (e) => {setPostData({ ...postData, creator: e.target.value })} }
        />
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth
          value={postData.title}
          onChange={ (e) => setPostData({ ...postData, title: e.target.value }) }
        />
        <TextField 
          name="message" 
          variant="outlined" 
          label="Message" 
          fullWidth
          value={postData.message}
          onChange={ (e) => setPostData({ ...postData, message: e.target.value }) }
        />
        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags" 
          fullWidth
          value={postData.tags}
          onChange={ (e) => setPostData({ ...postData, tags: e.target.value }) }
        />
        <div>
        <FileBase
          type='file'
          multiple={false}
          onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
        />
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          type="submit" 
          fullWidth
        >Submit
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={clear} 
          fullWidth
        >Clear
        </Button>
      </form>
    </Paper>
  );

}

export default Form;