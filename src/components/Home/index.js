import React from 'react';
import {Button} from '@material-ui/core';
import Interview_Posts from '../Interview_Posts';
import Question_section from '../Question_section';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleOnPosts,handleOnQuestions } from "../../redux/actions";
import * as actionTypes from "../../redux/actions";
import axios from "axios";
class Home extends React.Component{
  displayPosts=()=>{
  let {handleOnPosts}=this.props;
      axios
        .get("https://tranquil-wildwood-09825.herokuapp.com/api/post")
        .then(response => {
        let  post_s = response.data.posts.map(p=>p);
          this.props.handleOnPosts("posts", post_s);
        });
    }
    displayQuestions=()=>{
      var { handleOnQuestions } = this.props;
      let question_s = [];
      axios
        .get("https://tranquil-wildwood-09825.herokuapp.com/api/question_section")
        .then(response => {
          question_s = response.data.posts.map(q => q);
          handleOnQuestions("questions", question_s);
        });
    }
  render(){

    return(
      <div>
      <Button  color="primary" onClick={this.displayPosts}>Post</Button>
      <Interview_Posts />
      <Button  color="primary" onClick={this.displayQuestions}>question</Button>

      <Question_section />
      </div>
    );
    }
  }
  const mapStateToProps = ({ questions,posts }) => {
    return {
      questions,posts
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      handleOnQuestions: (question, val) => {
        dispatch(handleOnQuestions(question, val));
      },
      handleOnPosts: (post, value) => {
        dispatch(handleOnPosts(post, value));
      }
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Home));
