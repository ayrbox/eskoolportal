import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { deletePost, likePost, unlikePost } from "../../actions/postActions";

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
      <div className="ibox mb-3">
        <div className="ibox-content">
          <div className="social-feed-box">
            <div className="social-avatar">
              {post.user === auth.user.id ? (
                <button
                  type="button"
                  className="btn btn-sm btn-white mr-1 pull-right"
                  onClick={this.onDeletePost.bind(this, post._id)}
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}

              <Link to={`/profile/${auth.user.id}`} className="pull-left">
                <img className="rounded-circle" src={post.avatar} alt="" />
              </Link>

              <div className="media-body">
                <Link to={`/profile/${auth.user.id}`}>{auth.user.name}</Link>
                <small className="text-muted" />
              </div>
            </div>
            <div className="social-body">
              <p>{post.text}</p>

              {showActions ? (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-white btn-xs"
                    onClick={this.onLike.bind(this, post._id)}
                  >
                    <i
                      className={classnames("fas fa-thumbs-up mr-2", {
                        "text-success": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={this.onUnlike.bind(this, post._id)}
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-white btn-xs"
                  >
                    Comments
                  </Link>
                </div>
              ) : null}
            </div>
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

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  PostItem
);
