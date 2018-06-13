const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

const validatePostInput = require("../../validation/post");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const _post = new Post({
      text: req.body.text,
      author: req.body.author,
      avatar: req.body.avatar,
      user: req.user.id
    });

    _post.save().then(post => res.json(post));
  }
);

// @router api/posts
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => err.status(500).json({ posts: "Unable to read posts" }));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ notfound: "Post not found" });
      }

      res.json(post);
    })
    .catch(err => err.status(500).json({ posts: "Unable to get post" }));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => ({ success: false, detail: res.response.data }));
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      if (!post) {
        return res.status(404).json({ notfound: "Post not found" });
      }

      if (
        post.likes.filter(like => {
          return like.user.toString() === req.user.id;
        }).length > 0
      ) {
        return res
          .status(400)
          .json({ notallowed: "User already liked this post" });
      }

      post.likes.unshift({ user: req.user.id });
      post.save().then(post => res.json(post));
    });
  }
);

router.delete(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      if (!post) {
        return res.status(404).json({ notfound: "Post not found" });
      }

      if (
        post.likes.filter(like => {
          return like.user.toString() === req.user.id;
        }).length === 0
      ) {
        return res
          .status(400)
          .json({ notallowed: "You have not liked this post yet." });
      }

      //get remove index
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);
      if (removeIndex === -1) {
        return res
          .status(400)
          .json({ noteallowed: "Your have not liked this post yet." });
      } else {
        post.likes.splice(removeIndex, 1);
      }
      post.save().then(post => res.json(post));
    });
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ notfound: "Post not found" });
        }

        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(500).json({ success: false, msg: error }));
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ notfound: "Post not found" });
        }

        if (
          post.comments.filter(comment => {
            return comment._id.toString() === req.params.comment_id;
          }).length === 0
        ) {
          return res.status(404).json({ notallowed: "Comment not found." });
        }

        //get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(500).json({ success: false, msg: error }));
  }
);

module.exports = router;
