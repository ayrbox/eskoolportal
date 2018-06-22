import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../../components/TextAreaGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const comment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      user: user.id
    };

    this.props.addComment(postId, comment);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
      <div className="social-comment">
        <div href="" className="pull-left">
          <img src={user.avatar} alt="User profile" />
        </div>
        <div class="media-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaGroup
                placeholder="Make comment"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-sm">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
