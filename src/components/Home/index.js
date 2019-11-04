import React from 'react';
import { Button } from '@material-ui/core';
import Interview_Posts from '../Interview_Posts';
import Question_section from '../Question_section';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleOnPosts, handleOnQuestions,handleOnCandidatePost } from "../../redux/actions";
import * as actionTypes from "../../redux/actions";
import axios from "axios";
import CandidatePostMap from '../CandidatePostMap';
class Home extends React.Component {

  displayPosts = () => {
    let { handleOnPosts } = this.props;
    axios
      .get("https://tranquil-wildwood-09825.herokuapp.com/api/post")
      .then(response => {
        let post_s = response.data.posts.map(p => p);
        this.props.handleOnPosts("posts", post_s);
      });
  }

  displayQuestions = () => {
    var { handleOnQuestions } = this.props;
    let question_s = [];
    axios
      .get("https://tranquil-wildwood-09825.herokuapp.com/api/question_section")
      .then(response => {
        question_s = response.data.posts.map(q => q);
        handleOnQuestions("questions", question_s);
      });
  };

  displayCandidatePostMaps = () => {
    var { handleOnCandidatePost } = this.props;
    let candidatePostMap_s = []
    axios
      .get("https://tranquil-wildwood-09825.herokuapp.com/api/candidate_post_map")
      .then(response => {
        let candidatePostMap_s = response.data.posts.map(p => p);
        this.props.handleOnCandidatePost("candidatePost", candidatePostMap_s);
      });
  };

  render() {

    return (
      <div>
        <Button color="primary" onClick={this.displayPosts}>Post</Button>
        <Interview_Posts />
        <Button color="primary" onClick={this.displayQuestions}>question</Button>
        <Question_section />
        <Button color="primary" onClick={this.displayCandidatePostMaps}>Candidate Post</Button>
        <CandidatePostMap />
      </div>
    );
  }
}
const mapStateToProps = ({ questions, posts,candidatePost }) => {
  return {
    questions, posts,candidatePost
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnQuestions: (question, val) => {
      dispatch(handleOnQuestions(question, val));
    },
    handleOnPosts: (post, value) => {
      dispatch(handleOnPosts(post, value));
    },
    handleOnCandidatePost: (candidatePost, postMapValue) => {
      dispatch(handleOnCandidatePost(candidatePost, postMapValue))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
