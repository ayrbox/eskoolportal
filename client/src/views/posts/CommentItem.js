import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="social-comment">
        <div className="pull-left">
          <img
            className="rounded-circle d-none d-md-block"
            src={comment.avatar}
            alt=""
          />
        </div>
        <div className="media-body">
          <div>{comment.name}</div>
          {comment.user === auth.user.id ? (
            <button
              type="button"
              className="btn btn-link pull-right"
              onClick={this.onDeleteComment.bind(this, postId, comment._id)}
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
          {comment.text}
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
