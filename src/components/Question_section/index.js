import React from "react";
import "./index.css";
import Create_Update_questions from "./Create_Update_questions";
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleOnQuestions, handleOnToggleDialog } from "../../redux/actions";
import * as actionTypes from "../../redux/actions";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class Question_section extends React.Component {
  getQuestions = () => {
    axios.get(`http://localhost:8086/api/question_section`).then(response => {
      console.log(response.data, "afetr delete");
    })
  }

  deleteQuestion = (e, q_uuid) => {
    debugger
    const { questions } = this.props;
    axios.delete(`http://localhost:8086/api/question_section/${q_uuid}`).then(result => {
      console.log(result.data);
      axios.get("http://localhost:8086/api/question_section")
        .then(response => {
          console.log(response);
        });
      debugger
    });
    this.getQuestions();
  }

  render() {
    const { questions, handleOnToggleDialog, toggleDialog, posts } = this.props;
    // const {deleteQuestion}=this;
    console.log(questions, posts, "questions");
    var { index } = toggleDialog;
    return (
      <Grid container>
        <Grid item md={12} className="icon">
          <AddCircleIcon
            button
            style={{ fontSize: 40, color: "gray" }} dialog={toggleDialog} onClick={() => { handleOnToggleDialog("Create Question", "CREATE") }}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>q_uuid</TableCell>
                  <TableCell>Post</TableCell>
                  <TableCell>Qusetion</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>answer</TableCell>
                  <TableCell>timer</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell>Created time</TableCell>
                  <TableCell>Updated by</TableCell>
                  <TableCell>Updated time</TableCell>
                  <TableCell>Edit </TableCell>
                </TableRow>
                {questions.map((question, index1) => {
                  return (
                    <TableRow key={index1}>
                      <TableCell>{index1 + 1}</TableCell>
                      <TableCell>{question.q_uuid}</TableCell>
                      <TableCell>{question.post_id}</TableCell>
                      <TableCell>{question.q_name}</TableCell>
                      <TableCell>
                        {question.options.map((q_option, index2) => {
                          return <p key={index2}>{q_option}</p>;
                        })}
                      </TableCell>
                      <TableCell>{question.q_answer}</TableCell>
                      <TableCell>{question.timer}</TableCell>
                      <TableCell>{question.created_by}</TableCell>
                      <TableCell>{question.created_time}</TableCell>
                      <TableCell>{question.updated_by}</TableCell>
                      <TableCell>{question.updated_time}</TableCell>
                      <TableCell>
                        <Button color="primary" onClick={() => handleOnToggleDialog("Update Question", "Update", index1)}> Edit </Button>
                        <Button color="primary" onClick={e => this.deleteQuestion(e, question.q_uuid)}> Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableHead>
            </Table>
          </Paper>
        </Grid>

        <Grid item md={1}></Grid>
        <Create_Update_questions />
      </Grid>
    );
  }
}
const mapStateToProps = ({ questions, posts, toggleDialog }) => {
  return {
    questions, toggleDialog, posts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnQuestions: (question, val) => {
      dispatch(handleOnQuestions(question, val));
    },
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Question_section));
