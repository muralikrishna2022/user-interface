// 1. import any needed libraries
const express = require("express");
const Comment = require('../models/comment'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/create', async (req, res) => {
    try {
      const comment = await Comment.createComment(req.body.comment, req.body.postId);
      res.send({...comment});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/getComments', async (req, res) => {
    try {
      const comment = await Comment.getComments(req.body.postId);
      res.send({...comment});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const comment = await Comment.updateComment(req.body.commentId, req.body.comment);
      res.send({...comment});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Comment.deleteComment(req.body.commentId);
      res.send({ success: "Comment deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;