import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import PostItem from "./PostItem";
import { getPost } from "../../actions/postActions";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

import Main from "../layouts/Main";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if ((post === null) | loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <div className="social-body">
            <PostItem post={post} showActions={false} />
          </div>
          <div className="social-footer">
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        </div>
      );
    }

    return (
      <Main>
        <div className="ibox">
          <div className="ibox-content post">
            <Link to="/feed" className="btn btn-light mb-3">
              Back to feed
            </Link>
            {postContent}
          </div>
        </div>
      </Main>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
