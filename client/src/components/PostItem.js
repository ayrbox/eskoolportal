import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { deletePost, likePost, unlikePost } from "../actions/postActions";

class PostItem extends Component {
  onDeletePost(id) {
    this.props.deletePost(id);
  }

  onLike(id) {
    this.props.likePost(id);
  }

  onUnlike(id) {
    this.props.unlikePost(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="container card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${auth.user.id}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>

            {showActions ? (
              <span>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onLike.bind(this, post._id)}
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-success": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onUnlike.bind(this, post._id)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeletePost.bind(this, post._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(PostItem);
