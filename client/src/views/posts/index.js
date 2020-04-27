import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { selectMenu } from "../../actions/uiActions";

import PostForm from "./PostForm";
import Spinner from "../../components/Spinner";
import PostFeed from "./PostFeed";
import Main from "../layouts/Main";

class PostsIndex extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.selectMenu("menu-post-feed");
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <Main>
        <div className="feed">
          <div className="container">
            <PostForm />
            {postContent}
          </div>
        </div>
      </Main>
    );
  }
}

PostsIndex.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts, selectMenu })(PostsIndex);
