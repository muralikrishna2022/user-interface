// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const postSchema = new mongoose.Schema({
  post_title: { type: String, unique: true, required: true},
  post_content: { type: String, required: true},
  user_id: {type: String, required: true}
})

// 3. create model of schema
const Post = mongoose.model("Post", postSchema);

// 4. create CRUD functions on model
//CREATE a user
async function createPost(postTitle, postContent, userId) {

  const newPost = await Post.create({
    post_title: postTitle,
    post_content: postContent,
    user_id: userId
  });

  return newPost;
}

// GET POST
async function getPost(userId) {
  return await Post.find({"user_id":userId});
}

// UPDATE
async function updatePostTitle(id, postTitle) {
  const post = await Post.updateOne({"_id": id}, {$set: { post_title: postTitle}});
  return post;
}

//DELETE
async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};

// 5. export all functions we want to access in route files
module.exports = { 
  createPost, getPost, updatePostTitle, deletePost 
};