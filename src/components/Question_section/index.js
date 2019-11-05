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
  Button,
  Icon
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleOnQuestions, handleOnToggleDialog } from "../../redux/actions";
import * as actionTypes from "../../redux/actions";
import axios from "axios";
import MaterialTable from "material-table";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class Question_section extends React.Component {
  getQuestions = () => {
    axios.get(`http://localhost:8086/api/question_section`).then(response => {
      console.log(response.data, "afetr delete");
    });
  };

  deleteQuestion = (e, q_uuid) => {
    debugger;
    const { questions } = this.props;
    axios
      .delete(
        `https://pure-wave-01085.herokuapp.com/api/question_section/${q_uuid}`
      )
      .then(result => {
        console.log(result.data);
        axios
          .get("https://pure-wave-01085.herokuapp.com/api/question_section")
          .then(response => {
            console.log(response);
          });
        debugger;
      });
    this.getQuestions();
  };

  render() {
    const { questions, handleOnToggleDialog, toggleDialog, posts } = this.props;

    var { index } = toggleDialog;
    const columns = [
      {
        title: "Sr. No.",
        field: "index"
      },
      {
        title: "uuid",
        field: "q_uuid"
      },
      {
        title: "Post",
        field: "post_id"
      },
      {
        title: "Question",
        field: "q_name"
      },
      {
        title: "Options",
        field: "options"
      },
      {
        title: "answer",
        field: "q_answer"
      },
      {
        title: "timer",
        field: "timer"
      },

      {
        title: "Created by",
        field: "created_by"
      },
      {
        title: "Updated by",
        field: "updated_by"
      },
      {
        title: "Edit",
        field: "action"
      }
    ];
    const data = Object.keys(questions).map((question, index) => ({
      index: index + 1,
      q_uuid: questions[index].q_uuid,
      post_id: questions[index].post_id,
      q_name: questions[index].q_name,
      options: questions[index].options,
      q_answer: questions[index].q_answer,
      timer: questions[index].timer,
      created_by: questions[index].created_by,
      updated_by: questions[index].updated_by,
      action: (
        <div>
          <Button
            onClick={() =>
              handleOnToggleDialog("Update Question", "Update", index)
            }
          >
            <Icon>edit</Icon>
          </Button>
          <Button
            onClick={e => this.deleteQuestion(e, questions[index].q_uuid)}
          >
            {" "}
            <Icon>delete</Icon>
          </Button>
        </div>
      )
    }));
    return (
      <Grid container>
        <Grid item md={12} className="icon">
          <AddCircleIcon
            button
            style={{ fontSize: 40, color: "gray" }}
            dialog={toggleDialog}
            onClick={() => {
              handleOnToggleDialog("Create Question", "CREATE");
            }}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Paper>
            <Table>
              <TableCell></TableCell>
            </Table>
            <MaterialTable
              options={{
                search: true,
                rowStyle: {
                  backgroundColor: "#FFFFFF"
                },
                headerStyle: {
                  backgroundColor: "#EEEE"
                }
              }}
              title="Question Section"
              data={data}
              columns={columns}
            />
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
    questions,
    toggleDialog,
    posts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnQuestions: (question, val) => {
      dispatch(handleOnQuestions(question, val));
    },
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Question_section));
