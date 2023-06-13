// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true},
  post_id: {type: String, required: true}
})

// 3. create model of schema
const Comment = mongoose.model("Comment", commentSchema);

// 4. create CRUD functions on model
//CREATE a user
async function createComment(comment, postId) {

  const newComment = await Comment.create({
    comment: comment,
    post_id: postId
  });

  return newComment;
}

// GET COMMENT
async function getComments(id) {
  return await Comment.findOne({ "post_id" : id});
}

// UPDATE
async function updateComment(id, updatedComment) {
  const comment = await Comment.updateOne({"_id": id}, {$set: { comment: updatedComment }});
  return comment;
}

//DELETE
async function deleteComment(id) {
  await Comment.deleteOne({"_id": id});
};

// 5. export all functions we want to access in route files
module.exports = { 
    createComment, getComments, updateComment, deleteComment 
};