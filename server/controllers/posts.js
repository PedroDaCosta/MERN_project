import mongoose from "mongoose";
import { PostMessage } from "../models/postsMessage.js";


export const getPosts = async (req, res) => {
  try {
    
    const postMessages = await PostMessage.find();
    
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const createPost = async (req, res) => {
  /* get token from jwt */
  if(!req.userId) { return res.json({message: 'Unauthenticated'});}

  const post = req.body;

  const newPost = new PostMessage({...post, creator_id: req.userId, currentAt: new Date().toISOString()});

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export const updatePost = async (req, res) => {
  if(!req.userId) { return res.status(404).json({message: 'Unauthenticated'});}

  /* deconstruct req.params gets element with key id and set it into a new 
  variable of name _id */
  const { id: _id } = req.params;

  const post = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json("Didn't find any document with that id.");
  }

  if(post.creator_id !== req.userId){ return res.status(404).json("Ids don't match you don't have authorization to delete this post");}

  /* findIdAndUpdate takes 3 agruments one is the id of the document the
      the second is the document and his values to be rewriten and last an 
      object with key value to define if the value should be updated before 
      the respose takes place this is usefull so the result of the update
      can be seen after the operation takes place*/
  const updatedMessages = await PostMessage.findByIdAndUpdate(
    _id,
    post,
    { new: true }
  );

  res.status(201).json(updatedMessages);
};


export const deletePost = async (req, res) => {

  if(!req.userId) { return res.status(404).json({message: 'Unauthenticated'});}

  /* deconstruct req.params gets element with key id and set it into a new 
  variable of name _id */
  const { id: _id } = req.params;

  const post = await PostMessage.findById( _id );

  if(post.creator_id !== req.userId){ return res.status(404).json("Ids don't match you don't have authorization to delete this post");}

  /* findIdAndDelete may takes 3 agruments but its only essential that 
      you pass the _id of the document that you want to delete.
      https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete*/
  await PostMessage.findByIdAndDelete(_id);

  res.status(201).json("Post deleted with success.");
};


export const likePost = async (req, res) => {
  
  /* get token from jwt */
  if(!req.userId) { return res.json({message: 'Unauthenticated'});}

  /* deconstruct req.params gets element with key id and set it into a new 
  variable of name _id */
  const { id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json("Didn't find any document with that id.");
  }

  const post = await PostMessage.findById( _id );
  
  const index = post.likes.findIndex((id) => id === String( req.userId ));

  if(index === -1){
    // like the post
    post.likes.push(req.userId);
  }else{
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String( req.userId ));
  }

  /* same as other functions*/
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    post,
    { new: true }
  );

  res.status(201).json(updatedPost);
};